import React from 'react';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-emergency-black">
      <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
        <img 
          src={IMAGES.logo} 
          alt="P.S Treinamentos Hero Background" 
          className="w-full h-full object-cover opacity-40 md:opacity-50 scale-105"
          {...{ fetchpriority: "high" }}
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-emergency-red text-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em] animate-pulse">
              Serviços e Treinamentos
            </span>
            <div className="h-[2px] w-20 bg-emergency-red"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase leading-[0.9] mb-8 drop-shadow-2xl">
            Sua Segurança,<br/>
            Nossa <span className="text-emergency-red">Missão.</span>
          </h1>

          <p className="text-gray-200 text-lg md:text-xl font-sans max-w-xl mb-10 border-l-4 border-emergency-red pl-6 drop-shadow">
            A P.S Treinamentos oferece <strong>Terceirização de Bombeiros e Guarda-Vidas</strong> de elite, além de cursos de formação profissional e brigada.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#servicos" className="bg-emergency-red text-white px-8 py-4 font-display font-bold text-xl uppercase tracking-widest hover:bg-white hover:text-emergency-red transition-all flex items-center justify-center gap-3 group btn-emergency-pulse">
              Nossas Soluções
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contato" className="border-2 border-white text-white px-8 py-4 font-display font-bold text-xl uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center">
              Fale Conosco
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-4 bg-hazard-pattern"></div>
    </section>
  );
};

export default Hero;