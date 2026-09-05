import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Favicon URL fornecido pelo usuário (transparente)
  const logoUrl = "https://i.ibb.co/gZJ0TZFd/Adobe-Express-file.png";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços & Cursos', href: '#servicos' },
    { label: 'Radar APH', href: '#radar-aph' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <nav 
      aria-label="Menu Principal"
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-emergency-black/95 backdrop-blur-sm border-b-4 border-emergency-red py-2' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="h-12 w-12 flex items-center justify-center overflow-hidden">
               <img 
                 src={logoUrl} 
                 alt="P.S Treinamentos Logo" 
                 className="h-full w-full object-contain filter drop-shadow-lg" 
                 loading="eager"
               />
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter text-white uppercase hidden md:block">
              P.S <span className="text-emergency-red">Treinamentos</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  className="text-white hover:text-emergency-red transition-colors px-3 py-2 rounded-md text-sm font-bold uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emergency-red"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <a 
              href="#contato" 
              className="bg-emergency-red hover:bg-red-700 text-white px-6 py-3 font-display font-bold uppercase tracking-wider flex items-center gap-2 clip-chevron transition-all hover:translate-x-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <PhoneCall size={18} aria-hidden="true" />
              Contratar
            </a>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              className="bg-emergency-red p-2 text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <div 
        id="mobile-menu"
        className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-emergency-black border-b-4 border-emergency-red`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => (
             <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-emergency-red hover:text-white block px-3 py-4 text-base font-bold uppercase border-l-4 border-transparent hover:border-white transition-all focus-visible:bg-emergency-red"
              >
                {item.label}
              </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;