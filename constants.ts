import { LifeBuoy, Flame, HeartPulse, ShieldAlert, Users, HardHat, Award } from 'lucide-react';

export const IMAGES = {
  logo: "/images/logo.png", 
  service_firefighter: "/images/service-firefighter.webp", 
  service_lifeguard: "/images/service-lifeguard.jpg", 
  course_first_aid: "/images/course-first-aid.jpg", 
  course_brigade: "/images/course-brigade.jpg", 
  course_lifeguard: "/images/course-lifeguard.webp",
  gallery_main: "/images/gallery-1.jpg", 
  gallery_secondary: "/images/gallery-2.jpg",
  gallery_tertiary: "/images/gallery-3.jpg", 
  gallery_quaternary: "/images/gallery-4.jpg",
};

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/pstreinamentosba/",
  youtube: "https://www.youtube.com/@PSTREINAMENTOSBA",
  whatsapp: "https://wa.me/557391518584",
  phone: "+55 73 9151-8584",
  email: "pstreinamentosba@gmail.com",
};

export const FAQ_DATA = [
  {
    question: "Os certificados são válidos em todo território nacional?",
    answer: "Sim, todos os nossos certificados de Guarda-Vidas, Brigada de Incêndio, Primeiros Socorros e NRs são emitidos em conformidade com as legislações vigentes (como a Lei Lucas) e normas técnicas brasileiras, possuindo validade em todo o país."
  },
  {
    question: "Qual a carga horária do curso de Guarda-Vidas?",
    answer: "A carga horária varia conforme a modalidade (Piscina ou Mar/Águas Abertas). Geralmente, o curso de formação intensiva possui entre 44h a 110h de instrução teórico-prática."
  },
  {
    question: "Vocês realizam treinamentos 'In Company' para empresas?",
    answer: "Com certeza. Adaptamos nossos treinamentos de Brigada de Incêndio e Primeiros Socorros para a realidade específica da sua empresa, realizando a instrução no próprio local de trabalho."
  },
  {
    question: "Preciso saber nadar para fazer o curso de Guarda-Vidas?",
    answer: "Sim, é necessário ter domínio básico de natação. Realizamos um teste de aptidão física inicial para garantir que o aluno consiga acompanhar as instruções de salvamento com segurança."
  }
];

export const COURSES = [
  {
    id: 1,
    title: "PRIMEIROS SOCORROS",
    description: "Protocolos atualizados de suporte à vida (BLS). Essencial para escolas, empresas e cidadãos.",
    icon: HeartPulse,
    image: IMAGES.course_first_aid,
    curriculum: [
      "Avaliação inicial da cena e da vítima",
      "Identificação de riscos e mecanismos de lesão",
      "Desobstrução de vias aéreas (adultos, crianças e bebês)",
      "RCP – Reanimação cardiopulmonar",
      "Uso do DEA (Desfibrilador Externo Automático)",
      "Atendimento a ferimentos e curativos",
      "Controle de hemorragias",
      "Primeiros socorros em queimaduras",
      "Reconhecimento e imobilização de fraturas",
      "Atendimento a emergências clínicas (convulsão, síncope, infarto e AVC)",
      "Reconhecimento e tratamento do estado de choque",
      "Técnicas de movimentação, remoção e transporte de vítimas"
    ]
  },
  {
    id: 2,
    title: "GUARDA-VIDAS (Formação)",
    description: "Curso completo de salvamento aquático. Técnicas de nado, resgate, reboque e recuperação de afogados.",
    icon: LifeBuoy,
    image: IMAGES.course_lifeguard,
    curriculum: [
      "Introdução ao salvamento aquático",
      "Prevenção de afogamentos",
      "Identificação de situações de risco e potenciais afogamentos",
      "Planejamento e execução do socorro aquático",
      "Técnicas de entrada, aproximação, abordagem e reboque",
      "Métodos de escape de vítima em pânico",
      "Salvamento com e sem equipamentos",
      "Busca, procura e localização de vítimas",
      "Salvamento em piscinas e parques aquáticos",
      "Estrutura e funcionamento do serviço de salvamento",
      "Papel, responsabilidades e postura profissional do guarda-vidas",
      "Técnicas de vigilância e patrulhamento de áreas aquáticas",
      "Comunicação, sinalização e procedimentos de segurança",
      "Primeiros socorros aplicados ao afogamento",
      "Avaliação final e simulações práticas"
    ]
  },
  {
    id: 3,
    title: "BRIGADA DE INCÊNDIO",
    description: "Formação de brigadistas para atuação em edificações, eventos e indústrias. Prevenção e combate inicial.",
    icon: Flame,
    image: IMAGES.course_brigade,
    curriculum: [
      "Papel, responsabilidades e comportamento do brigadista",
      "Aspectos legais e responsabilidades civis e criminais",
      "Teoria do fogo e seus elementos",
      "Formas de propagação do fogo",
      "Classes de incêndio e suas características",
      "Técnicas de prevenção e identificação de riscos",
      "Métodos de extinção de incêndio",
      "Agentes extintores e suas aplicações",
      "Uso correto de EPIs",
      "Operação de extintores e acessórios",
      "Uso de hidrantes, mangueiras e sistemas de combate",
      "Noções sobre sistemas de chuveiros automáticos (sprinklers)",
      "Sistemas de detecção e alarme de incêndio",
      "Iluminação de emergência, sinalização e comunicação",
      "Técnicas de abandono de área e rotas de fuga",
      "Atendimento e condução de pessoas com mobilidade reduzida"
    ]
  }
];

export const SERVICES = [
  {
    id: 1,
    title: "BOMBEIRO CIVIL",
    description: "Terceirização de bombeiros civis para eventos, indústrias, shoppings e condomínios. Profissionais equipados e prontos.",
    icon: HardHat,
    image: IMAGES.service_firefighter,
    features: ["Gestão de Risco", "Prevenção de Incêndios", "Pronto Atendimento"]
  },
  {
    id: 2,
    title: "GUARDA-VIDAS",
    description: "Serviço de guarda-vidas para clubes, hotéis, resorts e eventos náuticos. Segurança aquática total.",
    icon: ShieldAlert,
    image: IMAGES.service_lifeguard,
    features: ["Monitoramento Constante", "Resgate Aquático", "Primeiros Socorros"]
  }
];

export const STATS = [
  { label: "Vidas Protegidas", value: "+5.000", icon: Users },
  { label: "Profissionais Formados", value: "+500", icon: Award },
];

export interface FirstAidUpdateItem {
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

export const VERIFIED_FIRST_AID_UPDATES: FirstAidUpdateItem[] = [
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
