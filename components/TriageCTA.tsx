import React from 'react';
import { Target, ChevronRight, GraduationCap } from 'lucide-react';

interface TriageCTAProps {
  onOpen: () => void;
}

const TriageCTA: React.FC<TriageCTAProps> = ({ onOpen }) => {
  return (
    <section className="py-20 bg-emergency-black relative overflow-hidden border-b border-zinc-900">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emergency-red/5 skew-x-12 translate-x-1/2" aria-hidden="true"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-zinc-900 border-2 border-zinc-800 p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 group">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-emergency-red font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-6">
               <GraduationCap size={20} /> Training Hub Interativo
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-6 leading-[0.95]">
              Pratique o Resgate em <br/>
              <span className="text-emergency-red">Cenários Reais</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mb-0 font-sans border-l-2 border-zinc-800 pl-6">
              Teste seus reflexos e conhecimentos técnicos em nossos simuladores exclusivos. Aprenda a classificar vítimas no <strong>Método START</strong> ou a combater princípios de <strong>Incêndio</strong>.
            </p>
          </div>

          <div className="flex-shrink-0 w-full lg:w-auto">
            <button 
              onClick={onOpen}
              className="w-full lg:w-auto bg-white text-black hover:bg-emergency-red hover:text-white p-8 md:p-12 font-display font-bold uppercase text-xl md:text-2xl flex flex-col items-center gap-4 transition-all hover:scale-[1.02] btn-emergency-pulse group rounded-sm"
            >
              <Target size={44} className="group-hover:rotate-45 transition-transform duration-500" />
              <span>Acessar Portal de Treino</span>
              <div className="flex items-center gap-1 text-[10px] tracking-[0.4em] opacity-50">
                CLIQUE PARA ENTRAR <ChevronRight size={14} className="animate-bounce" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TriageCTA;