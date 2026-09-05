import React, { useState, useEffect } from 'react';
import { 
  Activity, CheckCircle, XCircle, X, ShieldAlert, Brain, 
  Flame, Droplets, FlaskConical, ZapOff, HeartPulse, LifeBuoy, Waves, 
  UserRound, ArrowRight, Info, Boxes, Power, BatteryCharging, 
  AlertTriangle, Wind, Eye
} from 'lucide-react';

type TriageColor = 'green' | 'yellow' | 'red' | 'black';

interface TriageScenario {
  id: number;
  description: string;
  respiration: string;
  perfusion: string;
  mentalStatus: string;
  correctColor: TriageColor;
  explanation: string;
}

const TRIAGE_SCENARIOS: TriageScenario[] = [
  {
    id: 1,
    description: "Vítima caminha em sua direção na zona quente, assustada mas obedecendo comandos verbais.",
    respiration: "Normal (20 mpm)",
    perfusion: "Presente",
    mentalStatus: "Orientado",
    correctColor: 'green',
    explanation: "START Passo 1: Se a vítima deambula (anda), ela é classificada como VERDE (Leve) e deve ser dirigida a um ponto de encontro."
  },
  {
    id: 2,
    description: "Vítima em decúbito dorsal, inconsciente e apneica. Você realiza a abertura de vias aéreas (manobra manual).",
    respiration: "Ausente (mesmo após abertura)",
    perfusion: "Ausente",
    mentalStatus: "Inconsciente",
    correctColor: 'black',
    explanation: "START Passo 2 (Respiração): Se não respira espontaneamente nem após a liberação das vias aéreas, classifica-se como PRETO (Óbito)."
  },
  {
    id: 3,
    description: "Vítima no chão, respiração acelerada e ruidosa. Pulso radial não palpável.",
    respiration: "36 mpm (>30)",
    perfusion: "Radial Ausente",
    mentalStatus: "Confuso",
    correctColor: 'red',
    explanation: "START Passo 3 (RPM): Frequência respiratória > 30 mpm classifica automaticamente como VERMELHO (Imediato). Prioridade de transporte."
  },
  {
    id: 4,
    description: "Vítima não consegue andar (fratura na perna). Respiração normal, pulso forte, obedece quando você pede para apertar sua mão.",
    respiration: "18 mpm (<30)",
    perfusion: "Capilar < 2s",
    mentalStatus: "Obedece Comandos",
    correctColor: 'yellow',
    explanation: "START Passo 4 (Mental): Não anda, mas tem RPM estável (Resp < 30, Perf < 2s, Mental Normal). Classifica-se como AMARELO (Retardado)."
  }
];

interface IconScenario {
  id: number;
  description: string;
  icon: React.ReactNode;
  correct: string;
  explanation: string;
  options?: { label: string; value: string }[];
}

const FIRE_SCENARIOS: IconScenario[] = [
  {
    id: 1,
    description: "Princípio de incêndio em painel elétrico (quadro de energia) energizado.",
    icon: <Power size={54} className="text-blue-400" />,
    correct: 'co2',
    explanation: "Classe C: Incêndios elétricos exigem agentes não condutores (CO2 ou PQS). Água jamais deve ser usada devido ao risco de choque."
  },
  {
    id: 2,
    description: "Fogo em pallets de madeira, papelão e restos de embalagens.",
    icon: <Boxes size={54} className="text-orange-500" />,
    correct: 'agua',
    explanation: "Classe A: Materiais sólidos que queimam em profundidade e deixam brasas exigem resfriamento com Água."
  },
  {
    id: 3,
    description: "Derramamento de solvente ou gasolina em chamas no pátio.",
    icon: <FlaskConical size={54} className="text-red-500" />,
    correct: 'pqs',
    explanation: "Classe B: Líquidos inflamáveis queimam na superfície. O PQS age por abafamento e quebra da reação em cadeia."
  }
];

const CPR_SCENARIOS: IconScenario[] = [
  {
    id: 1,
    description: "Qual a proporção compressão/ventilação para 1 socorrista no adulto (Protocolo AHA)?",
    icon: <HeartPulse size={54} className="text-red-500" />,
    options: [{label: "15 compressões : 2 ventilações", value: "15"}, {label: "30 compressões : 2 ventilações", value: "30"}, {label: "Só compressões (Leigos)", value: "hands-only"}],
    correct: "30",
    explanation: "Protocolo AHA 2020-2025: A relação universal para PCR em adultos é de 30 compressões para 2 ventilações."
  },
  {
    id: 2,
    description: "Qual a frequência correta de compressões por minuto (Rate)?",
    icon: <Activity size={54} className="text-emergency-red" />,
    options: [{label: "80 a 100 bpm", value: "80"}, {label: "100 a 120 bpm", value: "100"}, {label: "Máximo possível", value: "140"}],
    correct: "100",
    explanation: "A frequência deve ser de 100 a 120 compressões/minuto. Menos que isso não perfunde; mais que isso não permite retorno venoso."
  }
];

const WATER_SCENARIOS: IconScenario[] = [
  {
    id: 1,
    description: "Vítima consciente se debatendo a 3 metros da borda. Qual a abordagem primária?",
    icon: <LifeBuoy size={54} className="text-red-500" />,
    options: [{label: "Entrar na água e nadar", value: "swim"}, {label: "Alcançar (Vara/Objeto)", value: "reach"}, {label: "Jogar boia e esperar", value: "wait"}],
    correct: "reach",
    explanation: "Segurança do Socorrista: 'Reach, Throw, Row, Go'. Sempre tente ALCANÇAR ou JOGAR algo antes de entrar na água."
  }
];

const AED_SCENARIOS: IconScenario[] = [
  {
    id: 1,
    description: "O DEA analisa o ritmo e comanda: 'Choque Recomendado'. Ação imediata?",
    icon: <BatteryCharging size={54} className="text-yellow-500" />,
    options: [{label: "Afastar todos e acionar choque", value: "shock"}, {label: "Continuar RCP durante o choque", value: "continue"}, {label: "Checar pulso carotídeo", value: "pulse"}],
    correct: "shock",
    explanation: "Segurança da Cena: Garanta que NINGUÉM toca na vítima. Comande 'AFASTADOS' e pressione o botão de choque."
  },
  {
    id: 2,
    description: "Posição correta das pás (eletrodos) no tórax adulto?",
    icon: <UserRound size={54} className="text-zinc-400" />,
    options: [{label: "Infraclavicular Dir. / Lateral Esq.", value: "correct"}, {label: "Centro do tórax / Costas", value: "center"}, {label: "Mamilo Esq. / Mamilo Dir.", value: "nipples"}],
    correct: "correct",
    explanation: "Padrão Antero-Lateral: Pá direita abaixo da clavícula (esterno superior); Pá esquerda na linha axilar média (costelas inferiores)."
  }
];

const SCENE_SCENARIOS: IconScenario[] = [
  {
    id: 1,
    description: "Colisão veicular com poste. Fios de alta tensão sobre o carro. Vítimas conscientes.",
    icon: <AlertTriangle size={54} className="text-orange-500" />,
    options: [{label: "Extração rápida (Rautek)", value: "rescue"}, {label: "Isolar perímetro e orientar ficar no carro", value: "isolate"}, {label: "Jogar água nos pneus", value: "water"}],
    correct: "isolate",
    explanation: "Risco Elétrico: O solo pode estar energizado ('passo'). Oriente as vítimas a NÃO SAÍREM até o desligamento da rede."
  },
  {
    id: 2,
    description: "Ambiente confinado, cheiro forte de amêndoa amarga/gás. Vítima inconsciente.",
    icon: <Wind size={54} className="text-blue-300" />,
    options: [{label: "Entrar prendendo a respiração", value: "enter"}, {label: "Não entrar sem EPI (Autônomo)", value: "safe"}, {label: "Acender lanterna comum", value: "light"}],
    correct: "safe",
    explanation: "Espaço Confinado/Atmosfera Tóxica: Não entre sem proteção respiratória autônoma. Risco de intoxicação fatal para o socorrista."
  }
];

interface SimulatorHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const StartTriage: React.FC<SimulatorHubProps> = ({ isOpen, onClose }) => {
  const [activeView, setActiveView] = useState<'hub' | 'triage' | 'fire' | 'cpr' | 'water' | 'aed' | 'scene'>('hub');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; show: boolean } | null>(null);
  const [showManual, setShowManual] = useState(true);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else {
      document.body.style.overflow = 'auto';
      setActiveView('hub');
      setFeedback(null);
      setCurrentIdx(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChoice = (selected: string) => {
    let list: any[] = [];
    if (activeView === 'triage') list = TRIAGE_SCENARIOS;
    else if (activeView === 'fire') list = FIRE_SCENARIOS;
    else if (activeView === 'cpr') list = CPR_SCENARIOS;
    else if (activeView === 'water') list = WATER_SCENARIOS;
    else if (activeView === 'aed') list = AED_SCENARIOS;
    else if (activeView === 'scene') list = SCENE_SCENARIOS;

    const correctValue = activeView === 'triage' ? (list[currentIdx] as TriageScenario).correctColor : (list[currentIdx] as IconScenario).correct;
    setFeedback({ isCorrect: selected === correctValue, show: true });
  };

  const nextStep = () => {
    setFeedback(null);
    let listLength = 0;
    if (activeView === 'triage') listLength = TRIAGE_SCENARIOS.length;
    else if (activeView === 'fire') listLength = FIRE_SCENARIOS.length;
    else if (activeView === 'cpr') listLength = CPR_SCENARIOS.length;
    else if (activeView === 'water') listLength = WATER_SCENARIOS.length;
    else if (activeView === 'aed') listLength = AED_SCENARIOS.length;
    else if (activeView === 'scene') listLength = SCENE_SCENARIOS.length;

    if (currentIdx === listLength - 1) {
      setActiveView('hub');
      setCurrentIdx(0);
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-zinc-900 border-2 border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Compacto */}
        <div className="bg-emergency-black border-b border-zinc-800 p-3 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} className="text-emergency-red" />
            <span className="text-white font-display font-bold uppercase text-[10px] tracking-widest">
              {activeView === 'hub' ? 'Centro de Controle Operacional' : `Simulação: ${activeView.toUpperCase()}`}
            </span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white p-1"><X size={20} /></button>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
          
          {activeView === 'hub' && (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-in zoom-in-95 duration-300">
              <HubButton onClick={() => setActiveView('triage')} title="Protocolo START" desc="Triagem de Múltiplas Vítimas" icon={<Brain size={32} />} color="text-red-500" />
              <HubButton onClick={() => setActiveView('fire')} title="Combate a Incêndio" desc="Classes e Extintores" icon={<Flame size={32} />} color="text-orange-500" />
              <HubButton onClick={() => setActiveView('cpr')} title="RCP / BLS" desc="Suporte Básico de Vida" icon={<HeartPulse size={32} />} color="text-pink-500" />
              <HubButton onClick={() => setActiveView('aed')} title="Uso do DEA" desc="Desfibrilação Externa" icon={<BatteryCharging size={32} />} color="text-yellow-500" />
              <HubButton onClick={() => setActiveView('scene')} title="Segurança de Cena" desc="Avaliação de Riscos (3S)" icon={<Eye size={32} />} color="text-green-500" />
              <HubButton onClick={() => setActiveView('water')} title="Salvamento Aquático" desc="Prevenção e Resgate" icon={<Waves size={32} />} color="text-blue-500" />
            </div>
          )}

          {activeView !== 'hub' && !feedback?.show && (
            <div className="p-3 md:p-8 flex flex-col items-center">
              
              {/* Triage Manual Fixed Guide */}
              {activeView === 'triage' && (
                <div className="w-full max-w-lg mb-4">
                  <div className="bg-emergency-red/5 border border-emergency-red/20 p-3 rounded flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                       <span className="text-emergency-red text-[9px] font-black uppercase tracking-widest flex items-center gap-1"><Info size={12} /> Algoritmo START: 30 • 2 • PODE</span>
                       <button onClick={() => setShowManual(!showManual)} className="text-zinc-500 text-[8px] uppercase underline">{showManual ? 'Ocultar Guia' : 'Ver Guia'}</button>
                    </div>
                    {showManual && (
                      <div className="grid grid-cols-3 gap-2 border-t border-emergency-red/10 pt-2 text-center">
                        <div className="text-[9px] text-zinc-400 font-mono flex flex-col"><strong className="text-white text-[10px]">30 mpm</strong><span>Respiração</span></div>
                        <div className="text-[9px] text-zinc-400 font-mono flex flex-col"><strong className="text-white text-[10px]">2 seg</strong><span>Enchimento</span></div>
                        <div className="text-[9px] text-zinc-400 font-mono flex flex-col"><strong className="text-white text-[10px]">PODE</strong><span>Obedecer</span></div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Scenario Icon Box */}
              <div className="mb-4 md:mb-6 p-4 md:p-6 bg-zinc-950/80 rounded-full border border-zinc-800 shadow-xl ring-4 ring-emergency-red/5">
                 {activeView === 'triage' && <UserRound size={54} className="text-zinc-500" />}
                 {activeView === 'fire' && FIRE_SCENARIOS[currentIdx].icon}
                 {activeView === 'cpr' && CPR_SCENARIOS[currentIdx].icon}
                 {activeView === 'water' && WATER_SCENARIOS[currentIdx].icon}
                 {activeView === 'aed' && AED_SCENARIOS[currentIdx].icon}
                 {activeView === 'scene' && SCENE_SCENARIOS[currentIdx].icon}
              </div>

              {/* Description Area */}
              <div className="text-center mb-6 max-w-2xl">
                 <h4 className="text-white text-base md:text-xl font-display font-bold uppercase leading-tight px-2 tracking-wide">
                    "{activeView === 'triage' ? TRIAGE_SCENARIOS[currentIdx].description : 
                      activeView === 'fire' ? FIRE_SCENARIOS[currentIdx].description :
                      activeView === 'cpr' ? CPR_SCENARIOS[currentIdx].description : 
                      activeView === 'aed' ? AED_SCENARIOS[currentIdx].description :
                      activeView === 'scene' ? SCENE_SCENARIOS[currentIdx].description :
                      WATER_SCENARIOS[currentIdx].description}"
                 </h4>
              </div>

              {/* Interaction Elements */}
              <div className="w-full max-w-lg">
                 {activeView === 'triage' && (
                   <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                         <VitalCard label="R: Respiração" value={TRIAGE_SCENARIOS[currentIdx].respiration} color="blue" />
                         <VitalCard label="P: Perfusão" value={TRIAGE_SCENARIOS[currentIdx].perfusion} color="red" />
                         <VitalCard label="M: Mental" value={TRIAGE_SCENARIOS[currentIdx].mentalStatus} color="yellow" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <ActionButton label="Verde" color="bg-green-600" onClick={() => handleChoice('green')} />
                        <ActionButton label="Amarelo" color="bg-yellow-600" onClick={() => handleChoice('yellow')} />
                        <ActionButton label="Vermelho" color="bg-red-600" onClick={() => handleChoice('red')} />
                        <ActionButton label="Preto" color="bg-zinc-800" onClick={() => handleChoice('black')} />
                      </div>
                   </div>
                 )}

                 {activeView === 'fire' && (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <FireOption icon={<Droplets />} label="Água (A)" onClick={() => handleChoice('agua')} color="bg-blue-600" />
                      <FireOption icon={<FlaskConical />} label="PQS (B/C)" onClick={() => handleChoice('pqs')} color="bg-zinc-700" />
                      <FireOption icon={<ZapOff />} label="CO2 (C)" onClick={() => handleChoice('co2')} color="bg-zinc-800" />
                   </div>
                 )}

                 {(activeView === 'cpr' || activeView === 'water' || activeView === 'aed' || activeView === 'scene') && (
                   <div className="flex flex-col gap-2">
                      {(activeView === 'cpr' ? CPR_SCENARIOS[currentIdx].options : 
                        activeView === 'aed' ? AED_SCENARIOS[currentIdx].options :
                        activeView === 'scene' ? SCENE_SCENARIOS[currentIdx].options :
                        WATER_SCENARIOS[currentIdx].options)?.map(opt => (
                        <QuizOption key={opt.value} label={opt.label} onClick={() => handleChoice(opt.value)} />
                      ))}
                   </div>
                 )}
              </div>
            </div>
          )}

          {feedback?.show && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
              {feedback.isCorrect ? <CheckCircle size={54} className="text-green-500 mb-4" /> : <XCircle size={54} className="text-emergency-red mb-4" />}
              <h3 className={`text-xl md:text-2xl font-display font-bold uppercase mb-4 ${feedback.isCorrect ? 'text-green-500' : 'text-emergency-red'}`}>
                {feedback.isCorrect ? 'Procedimento Correto' : 'Erro Crítico'}
              </h3>
              <div className="bg-black/60 p-5 border-l-4 border-emergency-red max-w-xl mb-10 text-left rounded-r">
                 <p className="text-zinc-300 text-xs md:text-sm font-sans font-medium leading-relaxed">
                    {activeView === 'triage' ? TRIAGE_SCENARIOS[currentIdx].explanation : 
                     activeView === 'fire' ? FIRE_SCENARIOS[currentIdx].explanation :
                     activeView === 'cpr' ? CPR_SCENARIOS[currentIdx].explanation : 
                     activeView === 'aed' ? AED_SCENARIOS[currentIdx].explanation :
                     activeView === 'scene' ? SCENE_SCENARIOS[currentIdx].explanation :
                     WATER_SCENARIOS[currentIdx].explanation}
                 </p>
              </div>
              <button onClick={nextStep} className="bg-white text-black px-12 py-3 font-display font-bold uppercase text-xs hover:bg-emergency-red hover:text-white transition-all transform active:scale-95 shadow-2xl border-2 border-transparent hover:border-white">
                Próximo Cenário
              </button>
            </div>
          )}
        </div>

        <div className="bg-zinc-950 p-2 text-center border-t border-zinc-800 shrink-0">
           <p className="text-[7px] text-zinc-600 font-mono tracking-widest uppercase">P.S Treinamentos Engine • Technical Build 7.5</p>
        </div>
      </div>
    </div>
  );
};

/* --- Componentes Auxiliares --- */

const HubButton = ({ onClick, title, desc, icon, color }: any) => (
  <button onClick={onClick} className="bg-zinc-950/90 border border-zinc-800 p-4 text-left group hover:border-emergency-red transition-all relative overflow-hidden active:scale-[0.98] hover:shadow-[0_0_15px_rgba(220,38,38,0.1)]">
    <div className={`absolute -right-2 -bottom-2 opacity-5 ${color} group-hover:opacity-20 transition-opacity`}>
      {React.cloneElement(icon as React.ReactElement<any>, { size: 64 })}
    </div>
    <div className={`${color} mb-3`}>{icon}</div>
    <h5 className="text-white font-display font-bold uppercase text-xs mb-1 tracking-wide">{title}</h5>
    <p className="text-zinc-500 text-[8px] uppercase font-mono">{desc}</p>
  </button>
);

const VitalCard = ({ label, value, color }: any) => {
  const colors: any = {
    blue: "border-blue-500 text-blue-400",
    red: "border-red-500 text-red-400",
    yellow: "border-yellow-500 text-yellow-400"
  };
  return (
    <div className={`bg-black/50 p-2 rounded border-t-2 ${colors[color]} text-center shadow-inner`}>
      <span className="text-[6px] text-zinc-500 uppercase block font-black tracking-wider">{label}</span>
      <span className="text-white text-[9px] md:text-xs font-bold font-mono">{value}</span>
    </div>
  );
};

const ActionButton = ({ label, color, onClick }: any) => (
  <button onClick={onClick} className={`${color} text-white py-4 md:py-6 font-display font-bold uppercase text-[10px] rounded active:translate-y-1 transition-transform border border-white/5`}>{label}</button>
);

const FireOption = ({ icon, label, onClick, color }: any) => (
  <button onClick={onClick} className={`${color} p-4 flex flex-col items-center gap-2 text-white rounded group hover:scale-105 transition-transform shadow-xl border border-white/10`}>
    {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
    <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
  </button>
);

const QuizOption = ({ label, onClick }: any) => (
  <button onClick={onClick} className="bg-zinc-800/80 p-4 text-white text-[10px] md:text-xs font-bold uppercase hover:bg-emergency-red transition-colors text-left flex items-center justify-between group border border-zinc-700/50 rounded-sm">
    {label} <ArrowRight size={14} className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
  </button>
);

export default StartTriage;