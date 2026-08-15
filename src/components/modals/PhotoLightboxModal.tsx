import React from 'react';
import { X, Heart, PawPrint, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GalleryPhoto } from '../../types';

interface PhotoLightboxModalProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onLike?: (photoId: string) => void;
  onBoop?: (photoId: string) => void;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  photo,
  onClose,
  onNext,
  onPrev,
  onLike,
  onBoop,
}) => {
  if (!photo) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#94492c', '#d67d5c', '#8b9b5c', '#ffdcd0', '#d9eaa3'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Outer Click dismiss */}
      <div className="relative w-full max-w-3xl bg-slate-900/90 backdrop-blur-2xl rounded-[28px] overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row max-h-[90vh] text-white">
        {/* Close Button */}
        <button
          id="close-lightbox-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 text-white/80 hover:text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Image Section with nav arrows */}
        <div className="relative flex-1 bg-black/50 flex items-center justify-center min-h-[300px] md:min-h-[460px] overflow-hidden">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            referrerPolicy="no-referrer"
            className="w-full h-full max-h-[500px] object-contain"
          />

          {/* Prev/Next buttons */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-white/20 flex items-center justify-center backdrop-blur-md transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-white/20 flex items-center justify-center backdrop-blur-md transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Details & Interactive Sidebar */}
        <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-white/5 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/10">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-white/50 mb-2">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{photo.date}</span>
            </div>

            <h3 className="text-xl font-bold text-white font-heading">
              {photo.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 mt-2 mb-4">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{photo.location}</span>
            </div>

            <p className="text-sm text-white/70 leading-relaxed">
              {photo.caption}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  if (onLike) onLike(photo.id);
                  triggerConfetti();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 font-bold text-xs hover:bg-rose-500/30 active:scale-95 transition-all shadow-md backdrop-blur-sm"
              >
                <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                <span>{photo.likes} Likes</span>
              </button>

              <button
                onClick={() => {
                  if (onBoop) onBoop(photo.id);
                  triggerConfetti();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold text-xs hover:bg-emerald-500/30 active:scale-95 transition-all shadow-md backdrop-blur-sm"
              >
                <PawPrint className="w-4 h-4" />
                <span>{photo.boops} Boops</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white/80 font-bold text-xs transition-colors"
            >
              Close Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
