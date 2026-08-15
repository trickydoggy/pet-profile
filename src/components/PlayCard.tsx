import React from 'react';
import { Mail, Phone, Calendar, HeartHandshake, MessageSquare } from 'lucide-react';
import { BUDDY_PROFILE } from '../data/buddyData';

interface PlayCardProps {
  onEmailClick: () => void;
  onCallClick: () => void;
  onPlaydateClick: () => void;
}

export const PlayCard: React.FC<PlayCardProps> = ({
  onEmailClick,
  onCallClick,
  onPlaydateClick,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 shadow-2xl border border-white/10 transition-all hover:border-white/20 text-center relative overflow-hidden">
      {/* Decorative Frosted Glow */}
      <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

      {/* Heading */}
      <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-2">
        Vamos Brincar!
      </h3>

      {/* Subtext */}
      <p className="text-white/80 text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-6 font-normal">
        Quer marcar um encontro de cães ou falar com meus humanos?
      </p>

      {/* Action Buttons Row */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3.5 max-w-md mx-auto">
        {/* Email Us Button (Frosted Cyan-Blue Gradient) */}
        <button
          id="playcard-email-btn"
          onClick={onEmailClick}
          className="flex items-center justify-center gap-2.5 w-full h-12 sm:h-13 px-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-cyan-500/25 border border-cyan-300/30 transition-all transform active:scale-95"
        >
          <Mail className="w-5 h-5" />
          <span>Enviar E-mail</span>
        </button>

        {/* Call Button (Frosted Emerald Outline) */}
        <button
          id="playcard-call-btn"
          onClick={onCallClick}
          className="flex items-center justify-center gap-2.5 w-full h-12 sm:h-13 px-5 rounded-full border border-emerald-400/40 text-emerald-300 bg-emerald-500/10 font-semibold text-base hover:bg-emerald-500/20 transition-all transform active:scale-95 backdrop-blur-md"
        >
          <Phone className="w-5 h-5" />
          <span>Ligar</span>
        </button>
      </div>

      {/* Bonus Quick Schedule Playdate Shortcut */}
      <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-center gap-1.5 text-xs text-white/60">
        <span>Procurando um encontro no fim de semana?</span>
        <button
          id="playcard-schedule-link"
          onClick={onPlaydateClick}
          className="font-bold text-cyan-300 hover:text-cyan-200 flex items-center gap-1 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Agendar Encontro</span>
        </button>
      </div>
    </div>
  );
};
