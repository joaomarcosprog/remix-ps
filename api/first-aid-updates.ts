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
    title: "Diretrizes de RCP e Cuidados Cardiovasculares de Emergência",
    source: "AHA / Sociedade Brasileira de Cardiologia (SBC)",
    sourceType: "aha",
    category: "Ressuscitação Cardiopulmonar",
    date: "Diretriz Vigente",
    summary: "Reforço estrito na qualidade das compressões torácicas (profundidade de 5 a 6 cm em adultos e ritmo de 100 a 120 cpm). A pausa para ventilação ou análise do DEA não deve exceder 10 segundos, visando fração de compressão torácica acima de 60%.",
    practicalImpact: "Revezar socorristas a cada 2 minutos antes do cansaço muscular evidente, garantindo retorno total do tórax.",
    verificationStatus: "Diretriz Internacional Validada",
    sourceUrl: "https://abccardiol.org/article/atualizacao-da-diretriz-de-ressuscitacao-cardiopulmonar-e-cuidados-cardiovasculares-de-emergencia-da-sociedade-brasileira-de-cardiologia-2019/"
  },
  {
    id: "sobrasa-drowning-protocol",
    title: "Classificação em 6 Graus de Afogamento e Manual de Suporte Básico de Vida Aquático",
    source: "SOBRASA (Sociedade Brasileira de Salvamento Aquático)",
    sourceType: "sobrasa",
    category: "Salvamento Aquático",
    date: "Diretriz Nacional SOBRASA",
    summary: "O afogamento é essencialmente um evento hipóxico respiratório. Em casos de PCR por afogamento (Grau 6), o protocolo determina a realização imediata de 5 ventilações de resgate antes de iniciar as compressões torácicas 30:2.",
    practicalImpact: "Não atrasar o suporte tentando retirar água do pulmão: as 5 insuflações iniciais são vitais para oxigenar o miocárdio sob hipóxia.",
    verificationStatus: "Norma Técnica Brasileira",
    sourceUrl: "https://www.sobrasa.org/new_sobrasa/arquivos/SBVA/SBVA3.pdf"
  },
  {
    id: "samu-ovace-infant",
    title: "Protocolo de Suporte Básico de Vida: Manejo de OVACE (Desobstrução de Vias Aéreas)",
    source: "Ministério da Saúde / SAMU 192 (BVSMS)",
    sourceType: "samu",
    category: "Atendimento Pré-Hospitalar",
    date: "Manual Oficial do SAMU 192",
    summary: "Em bebês conscientes com engasgo severo (tosse ineficaz), aplica-se a manobra de 5 pancadas firmes no dorso seguidas de 5 compressões torácicas. Em adultos, aplica-se a Manobra de Heimlich. Proibida a varredura digital às cegas.",
    practicalImpact: "A pinça digital só deve ser realizada se o corpo estranho estiver 100% visível na cavidade oral.",
    verificationStatus: "Protocolo Federal de APH",
    sourceUrl: "https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_suporte_basico_vida.pdf"
  },
  {
    id: "lei-lucas-13722",
    title: "Lei Lucas (Lei nº 13.722): Exigência e Reciclagem Anual de Primeiros Socorros em Escolas",
    source: "Senado Federal / Legislação Federal",
    sourceType: "lei",
    category: "Legislação & Normas",
    date: "Obrigatória em Todo o Brasil",
    summary: "Determina a obrigatoriedade de capacitação e reciclagem em noções básicas de primeiros socorros para professores e funcionários de estabelecimentos de ensino públicos e privados de educação básica e recreação.",
    practicalImpact: "Instituições de ensino e creches devem manter certificação anual atualizada e kits de primeiros socorros inspecionados.",
    verificationStatus: "Legislação Federal",
    sourceUrl: "https://legis.senado.leg.br/norma/30432320"
  },
  {
    id: "mte-nr23-incendio",
    title: "Norma Regulamentadora NR-23: Proteção Contra Incêndios e Saídas de Emergência",
    source: "Ministério do Trabalho e Emprego",
    sourceType: "geral",
    category: "Segurança & Brigadas",
    date: "Texto Vigente Atualizado",
    summary: "Estabelece os requisitos de prevenção contra incêndios, rotas de fuga desobstruídas, sinalização de emergência e treinamento de pessoal para resposta inicial a princípios de incêndio em estabelecimentos comerciais e industriais.",
    practicalImpact: "Formação periódica de brigadistas e inspeção contínua dos sistemas de combate a incêndio e iluminação de emergência.",
    verificationStatus: "Norma Regulamentadora Oficial",
    sourceUrl: "https://www.guiatrabalhista.com.br/legislacao/nr/nr23.htm"
  },
  {
    id: "mte-nr35-altura",
    title: "Norma Regulamentadora NR-35: Trabalho em Altura e Procedimentos de Emergência e Resgate",
    source: "Ministério do Trabalho e Emprego",
    sourceType: "geral",
    category: "Segurança & Brigadas",
    date: "Texto Vigente Atualizado",
    summary: "Determina que toda atividade executada acima de 2 metros de altura deve contar com planejamento, análise de risco e plano de resgate para contenção de trauma de suspensão inerte.",
    practicalImpact: "Equipes de segurança devem possuir plano de emergência prático com tempos de resposta rápidos para liberação de vítimas suspensas.",
    verificationStatus: "Norma Regulamentadora Oficial",
    sourceUrl: "https://www.guiatrabalhista.com.br/legislacao/nr/nr35.htm"
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
  "sourceUrl": "Link oficial e direto para o documento ou texto da norma"
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
