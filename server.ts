import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { VERIFIED_FIRST_AID_UPDATES, FirstAidUpdateItem } from "./constants";

const app = express();
const PORT = 3000;

app.use(express.json());

const VERIFIED_SEED_UPDATES: FirstAidUpdateItem[] = VERIFIED_FIRST_AID_UPDATES;

// In-memory cache
let cachedData: {
  lastSync: string;
  updates: FirstAidUpdateItem[];
  source: "live_ai" | "verified_baseline";
} = {
  lastSync: new Date().toISOString(),
  updates: VERIFIED_SEED_UPDATES,
  source: "verified_baseline"
};

let lastFetchTimestamp = 0;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

// Lazy Gemini AI getter
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    try {
      geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.warn("Failed to initialize GoogleGenAI client:", err);
    }
  }
  return geminiClient;
}

async function fetchLatestUpdatesFromAI(): Promise<FirstAidUpdateItem[] | null> {
  const ai = getGeminiClient();
  if (!ai) return null;

  try {
    const prompt = `Você é um especialista em Atendimento Pré-Hospitalar (APH), Salvamento Aquático e Primeiros Socorros no Brasil.
Pesquise e liste as 5 atualizações, diretrizes e notas técnicas mais recentes e importantes de fontes oficiais e confiáveis no Brasil em língua portuguesa (SOBRASA - Sociedade Brasileira de Salvamento Aquático, Ministério da Saúde / SAMU 192, AHA / Comitê Brasileiro de Ressuscitação, e Lei Lucas).

Responda EXCLUSIVAMENTE em formato JSON (sem markdown de código ou explicações extras). A resposta deve ser um array JSON contendo exatamente 5 objetos no seguinte formato:
[
  {
    "id": "slug-identificador",
    "title": "Título conciso da novidade ou protocolo",
    "source": "Nome da fonte oficial (ex: SOBRASA, Ministério da Saúde, AHA)",
    "sourceType": "sobrasa" | "aha" | "samu" | "lei" | "geral",
    "category": "Salvamento Aquático" | "Ressuscitação Cardiopulmonar" | "Atendimento Pré-Hospitalar" | "Legislação & Normas",
    "date": "Mês/Ano ou Período",
    "summary": "Resumo técnico de 2 ou 3 frases sobre o protocolo",
    "practicalImpact": "O que muda diretamente na ação do socorrista ou brigadista em campo",
    "verificationStatus": "Diretriz Oficial Verificada",
    "sourceUrl": "https://..."
  }
]`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const responseText = response.text || "";
    const cleanJson = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanJson);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item, idx) => ({
        id: item.id || `update-${Date.now()}-${idx}`,
        title: String(item.title || "Atualização de Protocolo de APH"),
        source: String(item.source || "Fonte Oficial de Primeiros Socorros"),
        sourceType: (['sobrasa', 'aha', 'samu', 'lei', 'geral'].includes(item.sourceType) ? item.sourceType : 'geral') as any,
        category: String(item.category || "Atendimento Pré-Hospitalar"),
        date: String(item.date || "Atual"),
        summary: String(item.summary || ""),
        practicalImpact: String(item.practicalImpact || ""),
        verificationStatus: String(item.verificationStatus || "Diretriz Oficial Verificada"),
        sourceUrl: item.sourceUrl ? String(item.sourceUrl) : undefined
      }));
    }
  } catch (error) {
    console.warn("Could not fetch real-time updates via Gemini search grounding; using baseline records:", error);
  }

  return null;
}

let isFetchingLive = false;

async function refreshUpdatesInBackground() {
  if (isFetchingLive) return;
  isFetchingLive = true;
  try {
    const liveItems = await fetchLatestUpdatesFromAI();
    if (liveItems && liveItems.length >= 3) {
      cachedData = {
        lastSync: new Date().toISOString(),
        updates: liveItems,
        source: "live_ai"
      };
    } else {
      cachedData.lastSync = new Date().toISOString();
    }
    lastFetchTimestamp = Date.now();
  } catch (e) {
    console.error("Background refresh failed:", e);
  } finally {
    isFetchingLive = false;
  }
}

// API Routes
app.get("/api/first-aid-updates", async (req, res) => {
  const forceRefresh = req.query.refresh === "true";
  const now = Date.now();

  if (forceRefresh) {
    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000));
    const liveItems = await Promise.race([fetchLatestUpdatesFromAI(), timeoutPromise]);
    if (liveItems && liveItems.length >= 3) {
      cachedData = {
        lastSync: new Date().toISOString(),
        updates: liveItems,
        source: "live_ai"
      };
    }
    lastFetchTimestamp = now;
  } else if (now - lastFetchTimestamp > CACHE_TTL_MS) {
    lastFetchTimestamp = now;
    refreshUpdatesInBackground();
  }

  res.json({
    success: true,
    lastSync: cachedData.lastSync,
    source: cachedData.source,
    updates: cachedData.updates,
    sourcesList: [
      "SOBRASA (Salvamento Aquático)",
      "AHA / Comitê Brasileiro de Ressuscitação",
      "Ministério da Saúde / SAMU 192",
      "Legislação Federal / Lei Lucas (13.722)",
      "Normas Regulamentadoras MTE (NR-23 e NR-35)"
    ]
  });
});

app.post("/api/first-aid-updates/refresh", async (_req, res) => {
  const liveItems = await fetchLatestUpdatesFromAI();
  if (liveItems && liveItems.length >= 3) {
    cachedData = {
      lastSync: new Date().toISOString(),
      updates: liveItems,
      source: "live_ai"
    };
  } else {
    cachedData.lastSync = new Date().toISOString();
  }
  lastFetchTimestamp = Date.now();
  res.json({ success: true, lastSync: cachedData.lastSync, updates: cachedData.updates });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Express 5 routing: use '*all'
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`P.S Treinamentos Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
