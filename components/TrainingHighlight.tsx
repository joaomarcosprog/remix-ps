import React, { useState } from 'react';
import { Youtube, ThumbsUp, MessageCircle, Share2, Radio, Play } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const TrainingHighlight: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // ID do vídeo Short fornecido: BO9pq-xrzlI
  const videoId = "BO9pq-xrzlI";
  
  // Usando a imagem de alta qualidade do YouTube como capa leve
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // URL otimizada para Shorts que evita o erro 53 e problemas de carregamento
  // O parâmetro 'origin' e 'enablejsapi' ajudam a estabilizar o player em ambientes de webview/proxy
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&origin=${window.location.origin}`;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden border-t-8 border-zinc-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emergency-red to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Left Column: Content & CTA */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-red-900/20 border border-red-900/50 rounded px-4 py-2 mb-6">
              <Radio size={16} className="text-emergency-red animate-pulse" />
              <span className="text-emergency-red font-mono text-xs font-bold uppercase tracking-widest">
                Transmissão P.S Treinamentos
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase mb-6 leading-[0.9]">
              Aprenda Agora:<br />
              <span className="text-emergency-red">RCP de Alta Qualidade</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed border-l-4 border-zinc-800 pl-4 lg:pl-6">
              O conhecimento técnico faz a diferença entre a vida e a morte. 
              Confira este procedimento padrão e inscreva-se no canal para dominar táticas de 
              <strong className="text-white"> Resgate, Primeiros Socorros e Combate a Incêndio.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF0000] text-white px-8 py-4 font-display font-bold uppercase text-lg tracking-wider hover:bg-white hover:text-[#FF0000] transition-all shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_40px_rgba(255,0,0,0.6)] flex items-center justify-center gap-3 group rounded-sm"
              >
                <Youtube size={28} fill="currentColor" />
                Ver no YouTube
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 text-zinc-500 text-xs md:text-sm font-bold uppercase tracking-wider">
               <div className="flex flex-col items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                  <ThumbsUp size={24} className="group-hover:text-emergency-red transition-colors mb-1" />
                  <span>Curta</span>
               </div>
               <div className="flex flex-col items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                  <MessageCircle size={24} className="group-hover:text-emergency-red transition-colors mb-1" />
                  <span>Comente</span>
               </div>
               <div className="flex flex-col items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                  <Share2 size={24} className="group-hover:text-emergency-red transition-colors mb-1" />
                  <span>Compartilhe</span>
               </div>
            </div>
          </div>

          {/* Right Column: The Short (Phone Frame Style) - FACADE PATTERN */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="relative mx-auto lg:mx-0 w-[280px] md:w-[320px] aspect-[9/16] bg-zinc-900 rounded-[2.5rem] border-[10px] border-zinc-800 shadow-2xl shadow-emergency-red/20 overflow-hidden ring-1 ring-white/10 group">
              
              {/* Phone Speaker/Camera Notch mockup */}
              <div className="absolute top-0 inset-x-0 h-8 bg-zinc-800 rounded-b-[1.5rem] z-20 flex items-center justify-center gap-2 pointer-events-none">
                 <div className="w-16 h-1 bg-zinc-900 rounded-full"></div>
                 <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></div>
              </div>

              {/* LIVE Indicator Overlay */}
              <div className="absolute top-12 left-6 z-20 flex items-center gap-2 pointer-events-none drop-shadow-lg">
                 <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-500 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                 <span className="text-white text-[10px] font-bold uppercase tracking-widest">AULA PRÁTICA</span>
              </div>

              {/* VIDEO AREA */}
              <div className="absolute inset-0 w-full h-full bg-black">
                {!isPlaying ? (
                  /* THUMBNAIL (SÓ CARREGA O IFRAME AO CLICAR) */
                  <div 
                    className="w-full h-full relative cursor-pointer" 
                    onClick={handlePlay}
                    role="button"
                    title="Assistir treinamento de RCP"
                  >
                    <img 
                      src={thumbnailUrl} 
                      alt="Miniatura do treinamento de RCP" 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 scale-110"
                      loading="lazy"
                    />
                    
                    {/* Botão de Play Centralizado */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-emergency-red/90 text-white rounded-full p-6 shadow-[0_0_40px_rgba(220,38,38,0.7)] group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm border border-white/20">
                        <Play size={44} fill="currentColor" className="ml-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-16 inset-x-0 text-center">
                       <p className="text-white text-xs font-bold uppercase tracking-[0.2em] bg-black/40 py-2 backdrop-blur-sm">Aperte para Assistir</p>
                    </div>
                  </div>
                ) : (
                  /* IFRAME CARREGADO DINAMICAMENTE */
                  <iframe
                    className="absolute inset-0 w-full h-full border-0"
                    src={embedUrl}
                    title="P.S Treinamentos - RCP de Alta Qualidade"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
              
              {/* Moldura de Vidro (Reflexo) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none opacity-30 z-10"></div>
              
              {/* Bottom Gradient */}
              <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-[5]"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrainingHighlight;