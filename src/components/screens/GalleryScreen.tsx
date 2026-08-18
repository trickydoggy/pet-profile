import React, { useState } from "react";
import {
  Heart,
  Sparkles,
  MapPin,
  Calendar,
  Camera,
  Maximize2,
  PawPrint,
} from "lucide-react";
import confetti from "canvas-confetti";
import { GALLERY_PHOTOS } from "../../data/buddyData";
import { GalleryPhoto } from "../../types";

interface GalleryScreenProps {
  onSelectPhoto: (photo: GalleryPhoto) => void;
}

export const GalleryScreen: React.FC<GalleryScreenProps> = ({
  onSelectPhoto,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [photos, setPhotos] = useState<GalleryPhoto[]>(GALLERY_PHOTOS);

  const categories = [
    { id: "all", label: "Todas as Fotos", icon: "📸" },
    { id: "park", label: "Aventuras no Parque", icon: "🌳" },
    { id: "naps", label: "Sonecas Aconchegantes", icon: "😴" },
    { id: "puppy", label: "Época de Filhote", icon: "🟤" },
    { id: "friends", label: "Amigos Caninos", icon: "🐶" },
    { id: "resting", label: "Descanso", icon: "🛏️" },
  ];

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  const handleLike = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    setPhotos((prev) =>
      prev.map((p) => (p.id === photoId ? { ...p, likes: p.likes + 1 } : p)),
    );

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { x, y },
      colors: ["#f43f5e", "#fb7185", "#22d3ee", "#ffffff"],
    });
  };

  const handleBoop = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    setPhotos((prev) =>
      prev.map((p) => (p.id === photoId ? { ...p, boops: p.boops + 1 } : p)),
    );

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { x, y },
      colors: ["#34d399", "#22d3ee", "#38bdf8", "#ffffff"],
    });
  };

  return (
    <div className="space-y-6 pb-24 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 shadow-2xl border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading flex items-center gap-2">
              <Camera className="w-6 h-6 text-cyan-400" />
              <span>Álbum de Fotos do Doug</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-1">
              Aventuras, ziguezagues, sonecas no parque e lembranças de filhote.
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3.5 py-1 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold rounded-full">
              {photos.length} Lembranças
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-${cat.id}-btn`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-300/40"
                  : "bg-white/10 text-white/70 hover:bg-white/15 border border-white/10"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            id={`photo-card-${photo.id}`}
            onClick={() => onSelectPhoto(photo)}
            className="group bg-white/5 backdrop-blur-xl rounded-[24px] overflow-hidden shadow-2xl border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer flex flex-col"
          >
            {/* Image Box */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5">
                <span className="text-white text-xs font-medium flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Clique para ver a foto completa</span>
                </span>
              </div>

              {/* Location Badge */}
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>{photo.location}</span>
              </div>
            </div>

            {/* Content & Actions */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>{photo.date}</span>
                  </span>
                </div>
                <h3 className="font-bold text-white text-base font-heading">
                  {photo.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 mt-1 line-clamp-2 leading-relaxed">
                  {photo.caption}
                </p>
              </div>

              {/* Interaction Bar */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Like Button */}
                  <button
                    id={`like-photo-${photo.id}-btn`}
                    onClick={(e) => handleLike(e, photo.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold hover:bg-rose-500/30 active:scale-95 transition-all border border-rose-400/30 backdrop-blur-sm"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                    <span>{photo.likes}</span>
                  </button>

                  {/* Boop Snoot Button */}
                  <button
                    id={`boop-photo-${photo.id}-btn`}
                    onClick={(e) => handleBoop(e, photo.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30 active:scale-95 transition-all border border-emerald-400/30 backdrop-blur-sm"
                    title="Aperte o focinho!"
                  >
                    <PawPrint className="w-3.5 h-3.5" />
                    <span>{photo.boops} Focinhadas</span>
                  </button>
                </div>

                <span className="text-[11px] text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
                  Ver foto &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
