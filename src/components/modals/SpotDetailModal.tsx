import React from 'react';
import {
  X,
  MapPin,
  Star,
  Clock,
  Navigation,
  CalendarHeart,
  Check,
  Shield,
  Compass,
} from 'lucide-react';
import { NeighborhoodSpot } from '../../types';

interface SpotDetailModalProps {
  spot: NeighborhoodSpot | null;
  onClose: () => void;
  onPlanPlaydate: (spot: NeighborhoodSpot) => void;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({
  spot,
  onClose,
  onPlanPlaydate,
}) => {
  if (!spot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900/90 backdrop-blur-2xl rounded-[28px] w-full max-w-lg shadow-2xl border border-white/20 overflow-hidden max-h-[90vh] overflow-y-auto relative text-white">
        {/* Close Button */}
        <button
          id="close-spot-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 text-white/80 hover:text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Spot Hero Image */}
        <div className="relative h-48 sm:h-56 w-full bg-slate-950">
          <img
            src={spot.imageUrl}
            alt={spot.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="px-3 py-1 rounded-full bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-1.5 inline-block backdrop-blur-md">
              {spot.category}
            </span>
            <h3 className="text-2xl font-extrabold font-heading text-white drop-shadow-md">
              {spot.name}
            </h3>
          </div>
        </div>

        {/* Spot Details Body */}
        <div className="p-6 space-y-4">
          {/* Location & Rating */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/70 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="font-medium">{spot.address}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-400/30 px-3 py-1 rounded-full backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{spot.buddyRating.toFixed(1)} / 5.0</span>
            </div>
          </div>

          <p className="text-sm text-white/80 leading-relaxed">
            {spot.description}
          </p>

          {/* Buddy's Personal Tip Box */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <strong className="block font-bold text-cyan-300 mb-1 flex items-center gap-1">
              <span>🐾</span> Recomendação Secreta do Buddy:
            </strong>
            <span className="text-white/70 italic leading-normal">
              "{spot.buddyTip}"
            </span>
          </div>

          {/* Spot Attributes */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-white/50 block text-[11px]">Melhor Horário para Visitar</span>
              <strong className="text-white font-semibold">{spot.bestTimeToVisit}</strong>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-white/50 block text-[11px]">Regra de Coleira</span>
              <strong className="text-emerald-400 font-semibold">{spot.leashRule}</strong>
            </div>
          </div>

          {/* Amenities checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
              Comodidades para Cães
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {spot.amenities.map((amenity, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium border border-white/10 flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{amenity}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                spot.name + ' ' + spot.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-full border border-white/20 text-white/90 font-bold text-xs sm:text-sm hover:bg-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>Como Chegar</span>
            </a>

            <button
              id="spot-modal-meet-btn"
              onClick={() => {
                onClose();
                onPlanPlaydate(spot);
              }}
              className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm active:scale-95 transition-all shadow-lg shadow-cyan-500/25 border border-cyan-300/30 flex items-center justify-center gap-2"
            >
              <CalendarHeart className="w-4 h-4" />
              <span>Encontrar o Buddy Aqui</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
