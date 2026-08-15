import React from 'react';
import { PawPrint, CalendarHeart, Smartphone, Monitor, Share2 } from 'lucide-react';
import { BUDDY_PROFILE } from '../data/buddyData';

interface HeaderProps {
  onOpenPlaydate: () => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPlaydate,
  isMobileFrame,
  setIsMobileFrame,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Mundo do Doug - Perfil de Pug",
        text: "Confira o Doug, o Pug mais lindo do mundo!",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/60 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand logo & name with Frosted Glass gradient icon */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-white/20">
            <PawPrint className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-heading flex items-center gap-1.5">
              Mundo do Doug
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Quick Playdate button */}
          <button
            id="header-playdate-btn"
            onClick={onOpenPlaydate}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-500/25 border border-cyan-300/30 transition-all transform active:scale-95"
          >
            <CalendarHeart className="w-4 h-4" />
            <span className="hidden xs:inline">Marcar Encontro</span>
            <span className="xs:hidden">Encontro</span>
          </button>

          {/* Share button */}
          <button
            id="header-share-btn"
            onClick={handleShare}
            className="p-2 rounded-full bg-white/10 hover:bg-white/15 text-white/90 transition-colors border border-white/15 backdrop-blur-md"
            title="Compartilhar Perfil do Doug"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {copied && (
        <div className="bg-cyan-500/90 backdrop-blur-md text-white text-center py-1 text-xs font-medium animate-pulse border-y border-cyan-400/40">
          🐾 Link copiado para a área de transferência! Compartilhe com amigos caninos!
        </div>
      )}
    </header>
  );
};
