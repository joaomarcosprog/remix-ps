import { LifeBuoy, Flame, HeartPulse, ShieldAlert, Users, HardHat, Award } from 'lucide-react';

export const IMAGES = {
  logo: "https://i.ibb.co/Swy0Dcys/Snap-Insta-to-488600621-1777644026427240-6858777735056928768-n.jpg", 
  service_firefighter: "https://i.ibb.co/1Gx80jKk/photo.webp", 
  service_lifeguard: "https://i.ibb.co/Rpf8J7cD/photo.jpg", 
  course_first_aid: "https://i.ibb.co/wZ0z377s/d5a03fb5-bfcb-4188-87da-1b13b7cc340c.jpg", 
  course_brigade: "https://i.ibb.co/FLtwTqkv/Snap-Insta-to-434374560-7297286667046635-2454867229478745687-n.jpg", 
  course_lifeguard: "https://i.ibb.co/4RNzDFqn/Snap-Insta-to-590428225-17941366212095841-5857972014208939382-n.webp",
  gallery_main: "https://i.ibb.co/B5kL908S/photo-1.jpg", 
  gallery_secondary: "https://i.ibb.co/y9Gjzgd/IMG-20250323-092936.jpg",
  gallery_tertiary: "https://i.ibb.co/s9yyjwzr/Snap-Insta-to-572094242-17936535630095841-6973727848562866143-n.jpg", 
  gallery_quaternary: "https://i.ibb.co/ccrf8GDn/photo-2.jpg",
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