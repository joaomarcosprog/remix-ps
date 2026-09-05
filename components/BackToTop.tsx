import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-50 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        aria-label="Voltar ao topo da página"
        className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-emergency-red text-white shadow-2xl hover:bg-emergency-black transition-colors border-2 border-white/20 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emergency-red"
      >
        <ArrowUp size={20} className="md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
      </button>
      {/* Small hazard accent on the button */}
      <div className="absolute -bottom-1 left-0 w-full h-1 bg-hazard-pattern opacity-50"></div>
    </div>
  );
};

export default BackToTop;