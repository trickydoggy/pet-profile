import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Star,
  Clock,
  Compass,
  CheckCircle2,
  CalendarHeart,
  ExternalLink,
  Info,
} from "lucide-react";
import { NEIGHBORHOOD_SPOTS } from "../../data/buddyData";
import { NeighborhoodSpot } from "../../types";

interface LocationScreenProps {
  onSelectSpot: (spot: NeighborhoodSpot) => void;
  onPlanPlaydateAtSpot: (spot: NeighborhoodSpot) => void;
}

export const LocationScreen: React.FC<LocationScreenProps> = ({
  onSelectSpot,
  onPlanPlaydateAtSpot,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSpotId, setSelectedSpotId] = useState<string>(
    NEIGHBORHOOD_SPOTS[0].id,
  );

  const categories = [
    { id: "all", label: "Todos os Locais" },
    { id: "park", label: "Parques de Cães 🌲" },
    { id: "cafe", label: "Cafés Pet ☕" },
    { id: "bakery", label: "Padarias Pet 🥨" },
    { id: "trail", label: "Trilhas Panorâmicas 🥾" },
    { id: "shopping", label: "Shopping" },
  ];

  const filteredSpots =
    activeCategory === "all"
      ? NEIGHBORHOOD_SPOTS
      : NEIGHBORHOOD_SPOTS.filter((s) => s.category === activeCategory);

  const currentSpot =
    NEIGHBORHOOD_SPOTS.find((s) => s.id === selectedSpotId) ||
    NEIGHBORHOOD_SPOTS[0];

  return (
    <div className="space-y-6 pb-24 animate-fadeIn">
      {/* Location Banner */}
      <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 shadow-2xl border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Bernal Heights & Mission, SF</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Locais Favoritos do Buddy
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-1">
              Os melhores morros sem coleira, cafés com chantilly para cães e
              padarias pet do bairro.
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`loc-filter-${cat.id}-btn`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-300/40"
                  : "bg-white/10 text-white/70 hover:bg-white/15 border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spot Detail Hero & Interactive Spot Cards */}
      <div className="space-y-4">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            id={`spot-card-${spot.id}`}
            onClick={() => {
              setSelectedSpotId(spot.id);
              onSelectSpot(spot);
            }}
            className={`bg-white/5 backdrop-blur-xl rounded-[24px] p-5 sm:p-6 shadow-2xl border transition-all cursor-pointer ${
              selectedSpotId === spot.id
                ? "border-cyan-400/60 ring-2 ring-cyan-400/30"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              {/* Spot Photo */}
              <div className="relative w-full sm:w-44 h-36 sm:h-auto rounded-2xl overflow-hidden bg-slate-900 flex-shrink-0 border border-white/10">
                <img
                  src={spot.imageUrl}
                  alt={spot.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-bold text-cyan-300 shadow-md border border-white/20">
                  {spot.category.toUpperCase()}
                </span>
              </div>

              {/* Spot Information */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                      {spot.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-400/30 px-2.5 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{spot.buddyRating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-white/60 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{spot.address}</span> •{" "}
                    <span className="font-semibold text-cyan-300">
                      {spot.distance}
                    </span>
                  </p>

                  <p className="text-xs sm:text-sm text-white/80 mt-2 leading-relaxed">
                    {spot.description}
                  </p>

                  {/* Buddy's Insider Tip */}
                  <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                    <span className="font-bold text-cyan-300 block mb-0.5">
                      🐾 Dica Secreta do Buddy:
                    </span>
                    <span className="text-white/70 italic">
                      "{spot.buddyTip}"
                    </span>
                  </div>
                </div>

                {/* Amenities & Action Buttons */}
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {spot.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-[11px] font-medium border border-white/10"
                      >
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Directions link */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        spot.name + " " + spot.address,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full border border-white/20 text-white/90 text-xs font-semibold hover:bg-white/10 backdrop-blur-md transition-all"
                    >
                      <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Como Chegar</span>
                    </a>

                    {/* Meet here button */}
                    <button
                      id={`plan-playdate-${spot.id}-btn`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlanPlaydateAtSpot(spot);
                      }}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 border border-cyan-300/30 active:scale-95 transition-all"
                    >
                      <CalendarHeart className="w-3.5 h-3.5" />
                      <span>Encontrar Aqui</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
