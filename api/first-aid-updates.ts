import type { IncomingMessage, ServerResponse } from "http";
import { GoogleGenAI } from "@google/genai";

interface FirstAidUpdateItem {
  id: string;
  title: string;
  source: string;
  sourceType: "sobrasa" | "aha" | "samu" | "lei" | "geral";
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
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

async function fetchLatestUpdatesFromAI(): Promise<FirstAidUpdateItem[] | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Atue como um Especialista em Atendimento Pré-Hospitalar (APH), Resgate Aquático (SOBRASA) e Combate a Incêndio.
Forneça as diretrizes e atualizações técnicas mais recentes e vigentes no Brasil (AHA, SOBRASA, SAMU 192, Legislação como Lei Lucas e NRs).
Retorne APENAS um array JSON válido contendo de 4 a 6 itens. Cada item deve ter exatamente este formato:
{
  "id": "identificador-curto-em-kebab-case",
  "title": "Título conciso da norma ou diretriz",
  "source": "Órgão emissor oficial (ex: AHA, SOBRASA, Ministério da Saúde, MTE)",
  "sourceType": "sobrasa" | "aha" | "samu" | "lei" | "geral",
  "category": "Ressuscitação Cardiopulmonar" | "Salvamento Aquático" | "Atendimento Pré-Hospitalar" | "Legislação & Normas" | "Segurança & Brigadas",
  "date": "Mês/Ano ou Vigência da Diretriz",
  "summary": "Resumo técnico objetivo de 2 a 3 frases com condutas baseadas em evidências.",
  "practicalImpact": "Aplicação prática imediata para socorristas, brigadistas ou guarda-vidas.",
  "verificationStatus": "Status oficial validado (ex: Diretriz Nacional Vigente)",
  "sourceUrl": "Link oficial de referência se houver"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    if (response.text) {
      const parsed = JSON.parse(response.text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as FirstAidUpdateItem[];
      }
    }
  } catch (err) {
    console.error("Erro ao consultar Gemini para atualizações de APH:", err);
  }
  return null;
}

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const forceRefresh = req.query?.refresh === "true" || req.method === "POST";
  const now = Date.now();

  if (forceRefresh || now - lastFetchTimestamp > CACHE_TTL_MS) {
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
    lastFetchTimestamp = now;
  }

  res.status(200).json({
    success: true,
    lastSync: cachedData.lastSync,
    source: cachedData.source,
    updates: cachedData.updates
  });
}
