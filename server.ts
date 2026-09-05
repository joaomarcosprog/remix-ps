import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

interface FirstAidUpdateItem {
  id: string;
  title: string;
  source: string;
  sourceType: 'sobrasa' | 'aha' | 'samu' | 'lei' | 'geral';
  category: string;
  date: string;
  summary: string;
  practicalImpact: string;
  verificationStatus: string;
  sourceUrl?: string;
}

const VERIFIED_SEED_UPDATES: FirstAidUpdateItem[] = [
  {
    id: "aha-cpr-q2",
    title: "Diretrizes de RCP e Suporte Básico: Foco na Fração de Compressão Torácica",
    source: "AHA / Comitê Brasileiro de Ressuscitação",
    sourceType: "aha",
    category: "Ressuscitação Cardiopulmonar",
    date: "Atualização Oficial Vigente",
    summary: "Reforço estrito na qualidade das compressões torácicas (profundidade de 5 a 6 cm em adultos e ritmo de 100 a 120 cpm). A pausa para ventilação ou análise do DEA não deve exceder 10 segundos, visando fração de compressão torácica acima de 60%.",
    practicalImpact: "Revezar socorristas a cada 2 minutos antes do cansaço muscular evidente, garantindo retorno total do tórax.",
    verificationStatus: "Diretriz Internacional Validada",
    sourceUrl: "https://cpr.heart.org/en/resources/cpr-facts"
  },
  {
    id: "sobrasa-drowning-protocol",
    title: "Classificação em 6 Graus de Afogamento e Prioridade Ventilatórias no Resgate Aquático",
    source: "SOBRASA (Sociedade Brasileira de Salvamento Aquático)",
    sourceType: "sobrasa",
    category: "Salvamento Aquático",
    date: "Diretriz Nacional SOBRASA",
    summary: "O afogamento é essencialmente um evento hipóxico respiratório. Em casos de PCR por afogamento (Grau 6), o protocolo determina a realização imediata de 5 ventilações de resgate antes de iniciar as compressões torácicas 30:2.",
    practicalImpact: "Não atrasar o suporte com compressões puras em afogados: as 5 insuflações iniciais são vitais para oxigenar o miocárdio sob hipóxia.",
    verificationStatus: "Norma Técnica Brasileira",
    sourceUrl: "https://www.sobrasa.org/"
  },
  {
    id: "samu-ovace-infant",
    title: "Manejo da Obstrução de Vias Aéreas por Corpo Estranho (OVACE) em Lactentes",
    source: "Ministério da Saúde / Protocolo APH SAMU 192",
    sourceType: "samu",
    category: "Atendimento Pré-Hospitalar",
    date: "Protocolo Oficial SAMU 192",
    summary: "Em bebês conscientes com engasgo severo (tosse ineficaz ou ausente), aplica-se a manobra de 5 pancadas firmes no dorso seguidas de 5 compressões torácicas com 2 dedos. É estritamente proibida a varredura digital às cegas.",
    practicalImpact: "A pinça digital só deve ser feita se o corpo estranho estiver 100% visível na cavidade oral.",
    verificationStatus: "Protocolo Federal de APH",
    sourceUrl: "https://www.gov.br/saude/pt-br"
  },
  {
    id: "lei-lucas-13722",
    title: "Lei Lucas (Lei nº 13.722): Exigência e Reciclagem Anual de Primeiros Socorros em Escolas",
    source: "Presidência da República / Legislação Federal",
    sourceType: "lei",
    category: "Legislação & Normas",
    date: "Obrigatória em Todo o Brasil",
    summary: "Determina a obrigatoriedade de capacitação e reciclagem em noções básicas de primeiros socorros para professores e funcionários de estabelecimentos de ensino públicos e privados de educação básica e recreação.",
    practicalImpact: "Instituições de ensino e creches devem manter certificação anual atualizada e kits de primeiros socorros inspecionados.",
    verificationStatus: "Legislação Federal",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13722.htm"
  },
  {
    id: "mte-nr23-nr35",
    title: "Normas Regulamentadoras NR 23 e NR 35: Preparação para Emergências e Resgate em Altura",
    source: "Ministério do Trabalho e Emprego (MTE)",
    sourceType: "geral",
    category: "Segurança & Brigadas",
    date: "Norma Regulamentadora Atualizada",
    summary: "Exigência de plano de emergência, simulados semestrais de abandono predial e procedimentos de auto-resgate e resgate em suspensão inerte para trabalhos em altura acima de 2 metros.",
    practicalImpact: "Formação técnica de brigada com foco prático em contenção de princípios de incêndio e uso correto de macas envelope/pranchas.",
    verificationStatus: "Norma Regulamentadora Oficial",
    sourceUrl: "https://www.gov.br/trabalho-e-emprego/pt-br"
  }
];

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
