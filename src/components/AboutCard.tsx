import React from 'react';
import { Cake, PawPrint, ChevronRight, Sparkles } from 'lucide-react';
import { BUDDY_PROFILE } from '../data/buddyData';

interface AboutCardProps {
  onViewDetails?: () => void;
}

export const AboutCard: React.FC<AboutCardProps> = ({ onViewDetails }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-[24px] sm:rounded-[28px] p-6 shadow-2xl border border-white/10 transition-all hover:border-white/20 relative overflow-hidden">
      {/* Subtle glowing background orb inside card */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-5 relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
          Sobre Mim
        </h3>
        {onViewDetails && (
          <button
            id="view-full-bio-btn"
            onClick={onViewDetails}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors group"
          >
            <span>Bio Completa</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Info List with cake and paw icons */}
      <div className="space-y-3.5 mb-6 text-white/80 relative z-10">

         {/* Breed */}
        <div className="flex items-center gap-3.5 text-base sm:text-lg font-medium text-white">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center flex-shrink-0 shadow-sm">
            <PawPrint className="w-4 h-4" />
          </div>
          <span>Eu sou um {BUDDY_PROFILE.breed}</span>
        </div>

        {/* Birthday */}
        <div className="flex items-center gap-3.5 text-base sm:text-lg font-medium text-white">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Cake className="w-4 h-4" />
          </div>
          <span>Nasci em {BUDDY_PROFILE.birthday}</span>
        </div>

      </div>

      {/* Trait Chips / Pills with Frosted Glass aesthetic */}
      <div className="flex flex-wrap items-center gap-2.5 relative z-10">
        {/* High Energy Pill (Frosted Emerald) */}
        <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold tracking-wide shadow-sm border border-emerald-400/30">
          Calmo
        </span>

        {/* Friendly Pill (Frosted Cyan) */}
        <span className="px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-semibold tracking-wide shadow-sm border border-cyan-400/30">
          Amigável
        </span>

        {/* Ball Obsessed Pill (Frosted Purple) */}
        <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium border border-purple-400/30">
          Louco por bifinho
        </span>
      </div>
    </div>
  );
};
