import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Map, ArrowRight } from 'lucide-react';

const Sitemap: React.FC = () => {
  return (
    <div className="min-h-screen bg-emergency-black text-white flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-zinc-900 border-l-8 border-emergency-red p-8 shadow-2xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Map size={100} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6 text-emergency-red">
            <AlertTriangle size={32} />
            <h1 className="font-display font-bold text-2xl uppercase tracking-wider">Ambiente de Preview</h1>
          </div>
          
          <p className="text-gray-400 mb-8 border-b border-zinc-800 pb-6">
            Você está acessando via ambiente de desenvolvimento/proxy. 
            O roteamento foi adaptado para <strong>HashRouter</strong> para evitar conflitos.
          </p>

          <div className="space-y-4">
            <h2 className="font-bold text-white uppercase text-sm tracking-widest mb-4">Páginas Disponíveis</h2>
            
            <Link 
              to="/lp-oficial" 
              className="flex items-center justify-between group bg-zinc-800 p-4 hover:bg-emergency-red transition-colors"
            >
              <span className="font-display font-bold uppercase">Landing Page Principal</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="mt-8 text-xs text-zinc-600 font-mono">
            System Check: Hybrid Routing Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;