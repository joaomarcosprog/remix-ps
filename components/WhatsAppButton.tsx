import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={SOCIAL_LINKS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-20 right-6 md:bottom-24 md:right-8 z-[100] group flex items-center gap-3"
    >
      <div className="bg-white text-emergency-black px-4 py-2 rounded-lg shadow-xl font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 hidden md:block border-2 border-emergency-red">
        Dúvida Rápida?
      </div>
      <div className="relative">
        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
        <div className="relative bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
          <MessageCircle size={24} className="md:w-8 md:h-8" fill="currentColor" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;