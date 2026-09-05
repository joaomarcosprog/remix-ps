import React from 'react';
import { STATS } from '../constants';

const Stats: React.FC = () => {
  return (
    <div className="bg-emergency-black relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-x border-zinc-800">
          {STATS.map((stat, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-6 p-10 hover:bg-zinc-900 transition-colors group ${index === 0 ? 'border-b md:border-b-0 md:border-r border-zinc-800' : ''}`}
            >
              <div className="bg-emergency-red p-4 text-white group-hover:scale-110 transition-transform">
                <stat.icon size={32} />
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-display font-bold text-white leading-none">
                  {stat.value}
                </div>
                <div className="text-emergency-red font-bold uppercase tracking-[0.2em] text-sm mt-1">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Decorative stripe */}
      <div className="h-2 bg-hazard-pattern opacity-50"></div>
    </div>
  );
};

export default Stats;