import React, { useState } from 'react';
import { Sparkles, Heart, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BUDDY_PROFILE } from '../data/buddyData';

interface HeroCardProps {
  onExploreMore?: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({ onExploreMore }) => {
  const [pats, setPats] = useState(148);
  const [isWagging, setIsWagging] = useState(false);

  const handlePat = (e: React.MouseEvent) => {
    setPats((prev) => prev + 1);
    setIsWagging(true);

    // Trigger sweet confetti burst from click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 65,
      origin: { x, y },
      colors: ['#22d3ee', '#3b82f6', '#a855f7', '#fb7185', '#ffffff'],
      shapes: ['circle'],
      scalar: 0.85,
    });

    setTimeout(() => setIsWagging(false), 800);
  };

  return (
    <div className="relative group overflow-hidden rounded-[26px] sm:rounded-[32px] shadow-2xl transition-all duration-300 border border-white/15 bg-white/5 backdrop-blur-xl hover:border-white/25">
      {/* Dog Hero Image Container */}
      <div className="relative aspect-[4/5] sm:aspect-[16/9] md:aspect-[16/8] w-full overflow-hidden">
        <img
          src={BUDDY_PROFILE.heroImage}
          alt="Doug, o cachorrinho mais bonito do mundo"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-[50%_8%] transition-transform duration-700 group-hover:scale-105 ${
            isWagging ? 'scale-105 filter saturate-110' : ''
          }`}
        />

        {/* Ambient Frosted Dark Gradient Overlay for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent pointer-events-none" />

        {/* Interactive Pat / Belly Rub badge in top-right with Frosted Glass styling */}
        <button
          id="hero-pat-buddy-btn"
          onClick={handlePat}
          className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-xl text-rose-300 text-xs font-bold shadow-lg hover:bg-slate-800/90 active:scale-90 transition-all border border-white/20 hover:border-rose-400/40"
          title="Clique para fazer carinho no Doug!"
        >
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          <span>{pats} Carinhos</span>
        </button>

        {/* Status pill in top-left with frosted emerald glow */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-xl text-emerald-300 text-xs font-semibold shadow-lg border border-emerald-400/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Ativo & Pronto para Brincar</span>
        </div>

        {/* Hero Title Overlay matching screenshot: "Olá, eu sou o Dougy!" */}
        <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col justify-end">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md font-heading flex items-center gap-2">
            Olá, eu sou o Doug!
          </h2>
          <p className="text-white/80 text-sm sm:text-base font-medium mt-1 drop-shadow flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
            São Paulo, SP • 10 anos
          </p>
        </div>
      </div>
    </div>
  );
};
