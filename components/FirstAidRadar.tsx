import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  RefreshCw, 
  ShieldCheck, 
  ExternalLink, 
  HeartPulse, 
  Waves, 
  Activity, 
  Scale, 
  Flame, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { FirstAidUpdate } from '../types';

const SOURCE_BADGES: Record<string, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  sobrasa: {
    label: "SOBRASA Oficial",
    bg: "bg-blue-950/80 border-blue-600/50",
    text: "text-blue-400",
    icon: <Waves size={14} className="text-blue-400" />
  },
  aha: {
    label: "Diretriz AHA / ILCOR",
    bg: "bg-red-950/80 border-red-600/50",
    text: "text-red-400",
    icon: <HeartPulse size={14} className="text-red-400" />
  },
  samu: {
    label: "Ministério da Saúde / SAMU",
    bg: "bg-amber-950/80 border-amber-600/50",
    text: "text-amber-400",
    icon: <Activity size={14} className="text-amber-400" />
  },
  lei: {
    label: "Legislação Federal",
    bg: "bg-emerald-950/80 border-emerald-600/50",
    text: "text-emerald-400",
    icon: <Scale size={14} className="text-emerald-400" />
  },
  geral: {
    label: "Norma Regulamentadora",
    bg: "bg-zinc-800 border-zinc-600",
    text: "text-zinc-300",
    icon: <Flame size={14} className="text-zinc-300" />
  }
};

const FirstAidRadar: React.FC = () => {
  const [updates, setUpdates] = useState<FirstAidUpdate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [lastSync, setLastSync] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchUpdates = async (force: boolean = false) => {
    try {
      if (force) setRefreshing(true);
      else setLoading(true);
      setErrorMessage(null);

      const url = force ? '/api/first-aid-updates?refresh=true' : '/api/first-aid-updates';
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Erro na resposta da rede: ${res.status}`);
      }
      const data = await res.json();
      if (data.updates && Array.isArray(data.updates)) {
        setUpdates(data.updates);
        if (data.lastSync) {
          const dateObj = new Date(data.lastSync);
          setLastSync(
            dateObj.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          );
        }
      }
    } catch (err) {
      console.error("Erro ao carregar atualizações de primeiros socorros:", err);
      setErrorMessage("Não foi possível sincronizar agora. Exibindo diretrizes salvas.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const categories = ['Todas', ...Array.from(new Set(updates.map(u => u.category)))];

  const filteredUpdates = selectedCategory === 'Todas' 
    ? updates 
    : updates.filter(u => u.category === selectedCategory);

  return (
    <section id="radar-aph" className="py-24 bg-zinc-950 text-white relative border-t-8 border-emergency-red overflow-hidden">
      {/* Texture & Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emergency-red/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 border-b border-zinc-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2.5 bg-red-950/60 border border-emergency-red/40 px-3.5 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-widest text-red-400 mb-4">
              <Radio size={14} className="animate-pulse text-emergency-red" />
              Radar Técnico de Primeiros Socorros & APH
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-white tracking-tight">
              Atualizações & <span className="text-emergency-red">Diretrizes Oficiais</span>
            </h2>
            <p className="text-gray-400 mt-3 text-base md:text-lg max-w-2xl font-sans">
              Monitore normas técnicas, protocolos de suporte básico de vida e diretrizes atualizadas diretamente de fontes reguladoras homologadas no Brasil.
            </p>
          </div>

          {/* Sync status & Refresh button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded text-xs font-mono flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-zinc-400">
                Última checagem: <strong className="text-white font-semibold">{lastSync || 'Hoje'}</strong>
              </span>
            </div>

            <button
              onClick={() => fetchUpdates(true)}
              disabled={refreshing || loading}
              className="bg-emergency-red hover:bg-red-700 text-white px-5 py-2.5 font-display font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              title="Verificar atualizações agora"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Verificando...' : 'Sincronizar'}
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-zinc-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-emergency-red text-white border-emergency-red'
                  : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status / Error Toast */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-amber-950/40 border border-amber-800 text-amber-200 text-xs font-mono flex items-center gap-3">
            <AlertCircle size={16} className="text-amber-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 animate-pulse space-y-4">
                <div className="h-4 bg-zinc-800 w-24"></div>
                <div className="h-6 bg-zinc-800 w-3/4"></div>
                <div className="h-20 bg-zinc-800"></div>
                <div className="h-10 bg-zinc-800"></div>
              </div>
            ))}
          </div>
        )}

        {/* Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpdates.map((item) => {
              const badge = SOURCE_BADGES[item.sourceType] || SOURCE_BADGES.geral;
              return (
                <article
                  key={item.id}
                  className="bg-zinc-900/90 border-l-4 border-emergency-red border-y border-r border-zinc-800/80 p-6 flex flex-col justify-between hover:border-r-zinc-600 transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] group"
                >
                  <div>
                    {/* Source Badge & Date */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded border ${badge.bg} ${badge.text}`}>
                        {badge.icon}
                        {badge.label}
                      </span>
                      <span className="text-zinc-500 text-[11px] font-mono flex items-center gap-1">
                        <Clock size={12} />
                        {item.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-lg md:text-xl text-white uppercase mb-3 leading-snug group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-sans">
                      {item.summary}
                    </p>

                    {/* Practical Impact Box ("O que muda na prática") */}
                    {item.practicalImpact && (
                      <div className="bg-black/70 border-l-2 border-amber-500 p-3 mb-6">
                        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-400 block mb-1">
                          Conduta Prática Recomendada:
                        </span>
                        <p className="text-zinc-300 text-xs leading-relaxed italic">
                          "{item.practicalImpact}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Verification Footer & Link */}
                  <div className="pt-4 border-t border-zinc-800/90 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 text-[11px] flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                      <span className="truncate max-w-[180px]">{item.verificationStatus}</span>
                    </span>

                    {item.sourceUrl ? (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emergency-red hover:text-white font-bold uppercase tracking-wider text-[11px] transition-colors"
                      >
                        Consultar
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-zinc-500 text-[10px] font-mono uppercase">
                        Homologado
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Source Disclaimer Banner */}
        <div className="mt-12 p-5 bg-zinc-900/50 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <p>
              Protocolos alinhados às diretrizes do <strong>Conselho Federal de Medicina</strong>, <strong>SOBRASA</strong>, <strong>AHA</strong> e <strong>Lei Lucas</strong>. Para orientações institucionais e treinamentos sob medida, fale com nossos instrutores credenciados.
            </p>
          </div>
          <a
            href="#contato"
            className="shrink-0 text-white bg-zinc-800 hover:bg-emergency-red px-4 py-2 font-display font-bold uppercase tracking-wider transition-colors"
          >
            Tirar Dúvida Técnica
          </a>
        </div>

      </div>
    </section>
  );
};

export default FirstAidRadar;
