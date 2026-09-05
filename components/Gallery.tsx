import React from 'react';
import { IMAGES, SOCIAL_LINKS } from '../constants';
import { ShieldCheck, Siren, Instagram, ExternalLink } from 'lucide-react';

const Gallery: React.FC = () => {
  return (
    <section id="galeria" className="py-24 bg-emergency-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Siren className="w-12 h-12 text-emergency-red mx-auto mb-4 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase">
            Em <span className="text-emergency-red">Ação</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Registros reais de nossos treinamentos, formaturas e atuação em campo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] mb-12">
          {/* Main Large Item - Group Photo */}
          <div className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden border-2 border-zinc-800 hover:border-emergency-red transition-colors">
            <img 
              src={IMAGES.gallery_main} 
              alt="Turma em Treinamento" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <div className="bg-emergency-red text-white text-xs font-bold px-2 py-1 inline-block mb-2 uppercase">Treinamento</div>
              <h3 className="text-2xl font-display font-bold uppercase">Instrução Prática</h3>
              <p className="text-sm text-gray-300">Preparação intensa para cenários reais.</p>
            </div>
          </div>

          {/* Secondary Item */}
          <div className="lg:col-span-2 relative group overflow-hidden border-2 border-zinc-800 hover:border-emergency-red transition-colors">
            <img 
              src={IMAGES.gallery_secondary} 
              alt="Atividade em Grupo" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
             <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-xl font-display font-bold uppercase flex items-center gap-2">
                <ShieldCheck size={18} className="text-emergency-red" />
                Equipe Unida
              </h3>
            </div>
          </div>

          {/* Tertiary Items */}
          <div className="relative group overflow-hidden border-2 border-zinc-800 hover:border-emergency-red transition-colors">
            <img 
              src={IMAGES.gallery_tertiary} 
              alt="Treinamento Técnico" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
               <span className="font-display font-bold uppercase text-center px-2">Técnica Aprimorada</span>
            </div>
          </div>

          <div className="relative group overflow-hidden border-2 border-zinc-800 hover:border-emergency-red transition-colors">
             <img 
              src={IMAGES.gallery_quaternary} 
              alt="Simulado" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
               <span className="font-display font-bold uppercase text-center px-2">Simulado Realista</span>
            </div>
          </div>
        </div>

        {/* Instagram CTA */}
        <div className="flex justify-center">
          <a 
            href={SOCIAL_LINKS.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border-2 border-emergency-red text-white px-8 py-4 font-display font-bold uppercase text-lg hover:bg-emergency-red transition-all"
          >
            <Instagram className="w-6 h-6" />
            Ver Galeria Completa no Instagram
            <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;