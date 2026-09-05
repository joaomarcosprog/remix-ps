import React, { useState } from 'react';
// Added SOCIAL_LINKS to the imported constants
import { FAQ_DATA, SOCIAL_LINKS } from '../constants';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emergency-red/5 rounded-full -mr-32 -mt-32" aria-hidden="true"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emergency-red text-white px-4 py-1 rounded-full text-xs font-bold uppercase mb-4">
            <HelpCircle size={14} /> Dúvidas Frequentes
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-emergency-black uppercase">
            Informações <span className="text-emergency-red">Importantes</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <div 
              key={index} 
              className={`border-2 transition-all duration-300 ${openIndex === index ? 'border-emergency-red bg-emergency-gray shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <button
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-bold uppercase tracking-tight transition-colors ${openIndex === index ? 'text-emergency-red' : 'text-emergency-black'}`}>
                  {item.question}
                </span>
                <ChevronDown 
                  className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-emergency-red' : 'text-gray-400'}`} 
                  size={24} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 bg-emergency-black text-white clip-diagonal">
          <p className="font-display font-bold uppercase text-xl mb-4">Não encontrou sua resposta?</p>
          <a 
            href={SOCIAL_LINKS.whatsapp} 
            className="inline-block bg-emergency-red text-white px-8 py-3 font-bold uppercase hover:bg-white hover:text-emergency-red transition-colors"
          >
            Falar com Instrutor
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;