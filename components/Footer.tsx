import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const logoUrl = "https://i.ibb.co/gZJ0TZFd/Adobe-Express-file.png";

  return (
    <footer className="bg-emergency-black text-white pt-16 pb-8 border-t-8 border-emergency-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-3 mb-6">
               <div className="h-12 w-12 flex items-center justify-center overflow-hidden">
                   <img src={logoUrl} alt="Logo P.S Treinamentos" className="w-full h-full object-contain" loading="lazy" />
               </div>
               <span className="font-display font-bold text-xl uppercase tracking-tighter">P.S Treinamentos</span>
             </div>
             <p className="text-gray-400 text-sm mb-6">
               Compromisso com a vida. Treinamento de alta performance para situações reais de emergência em Santa Cruz Cabrália e Região.
             </p>
             <div className="flex gap-4">
                <a 
                  href={SOCIAL_LINKS.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-zinc-800 p-2 rounded hover:bg-emergency-red transition-colors text-white"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href={SOCIAL_LINKS.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-zinc-800 p-2 rounded hover:bg-[#FF0000] transition-colors text-white"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
             </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold uppercase text-lg mb-6 text-emergency-red">Cursos</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#servicos" className="hover:text-white">Guarda-Vidas</a></li>
              <li><a href="#servicos" className="hover:text-white">Bombeiro Civil</a></li>
              <li><a href="#servicos" className="hover:text-white">Primeiros Socorros</a></li>
              <li><a href="#servicos" className="hover:text-white">NR 35</a></li>
            </ul>
          </div>

          <div>
             <h4 className="font-display font-bold uppercase text-lg mb-6 text-emergency-red">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><span className="text-zinc-500 cursor-not-allowed">Política de Privacidade</span></li>
              <li><span className="text-zinc-500 cursor-not-allowed">Termos de Uso</span></li>
              <li><span className="text-zinc-500 cursor-not-allowed">Certificações</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold uppercase text-lg mb-6 text-emergency-red">Newsletter</h4>
            <div className="flex">
              <input type="email" placeholder="SEU EMAIL" className="bg-zinc-800 text-white px-4 py-2 w-full focus:outline-none border border-zinc-700" />
              <button className="bg-emergency-red px-4 font-bold uppercase hover:bg-white hover:text-emergency-red transition-colors">OK</button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 pt-8 text-center text-xs text-zinc-500 uppercase tracking-wider">
          &copy; {new Date().getFullYear()} P.S Treinamentos. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;