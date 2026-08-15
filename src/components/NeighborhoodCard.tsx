import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Sparkles, Compass, Eye } from 'lucide-react';
import { NEIGHBORHOOD_SPOTS } from '../data/buddyData';
import { NeighborhoodSpot } from '../types';

interface NeighborhoodCardProps {
  onOpenFullMap?: () => void;
  onSelectSpot?: (spot: NeighborhoodSpot) => void;
}

export const NeighborhoodCard: React.FC<NeighborhoodCardProps> = ({
  onOpenFullMap,
  onSelectSpot,
}) => {
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  const activeSpot = NEIGHBORHOOD_SPOTS.find((s) => s.id === selectedPin);

  const handlePinClick = (e: React.MouseEvent, spotId: string) => {
    e.stopPropagation();
    setSelectedPin((prev) => (prev === spotId ? null : spotId));
  };

  return (
    <div className="space-y-3">
      {/* Section Header with Map Pin */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center shadow-sm">
            <MapPin className="w-4 h-4 fill-current" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
            Meu Bairro
          </h3>
        </div>
        {onOpenFullMap && (
          <button
            id="explore-all-spots-link"
            onClick={onOpenFullMap}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            <span>{NEIGHBORHOOD_SPOTS.length} Locais</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Illustrated Map Card matching mockup with Frosted Glass aesthetic */}
      <div
        id="neighborhood-map-container"
        onClick={onOpenFullMap}
        className="relative bg-white/5 backdrop-blur-xl rounded-[24px] sm:rounded-[28px] p-3 sm:p-4 shadow-2xl border border-white/10 overflow-hidden group cursor-pointer hover:border-cyan-400/40 transition-all"
      >
        {/* Inner Map Viewport */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#0d1527] border border-white/15">
          
          {/* Top miniature navigation header inside map mockup */}
          <div className="absolute top-0 left-0 right-0 z-20 px-3 py-2 flex items-center justify-between bg-slate-950/75 backdrop-blur-md border-b border-white/10 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1.5 font-bold text-cyan-400 uppercase tracking-wider">
              <span className="text-[12px]">🐾</span>
              <span>MUNDO DO BUDDY</span>
            </div>
            <div className="hidden xs:flex items-center gap-2 sm:gap-3 text-white/60 font-medium">
              <span className="hover:text-white">Amigos</span>
              <span className="hover:text-white">Perfis</span>
              <span className="text-cyan-400 font-semibold">Locais</span>
              <span className="hover:text-white">Entrar</span>
            </div>
          </div>

          {/* Stylized Illustrated Neighborhood Map Graphic */}
          <svg
            viewBox="0 0 800 480"
            className="w-full h-full object-cover select-none"
          >
            <defs>
              <linearGradient id="bayWater" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="bernalHill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#065f46" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
              <linearGradient id="precitaGrass" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
            </defs>

            {/* Background Canvas */}
            <rect width="800" height="480" fill="#0f172a" />

            {/* Grid overlay for tech frosted feel */}
            <g opacity="0.1" stroke="#38bdf8" strokeWidth="0.5">
              <line x1="0" y1="80" x2="800" y2="80" />
              <line x1="0" y1="160" x2="800" y2="160" />
              <line x1="0" y1="240" x2="800" y2="240" />
              <line x1="0" y1="320" x2="800" y2="320" />
              <line x1="0" y1="400" x2="800" y2="400" />
              <line x1="160" y1="0" x2="160" y2="480" />
              <line x1="320" y1="0" x2="320" y2="480" />
              <line x1="480" y1="0" x2="480" y2="480" />
              <line x1="640" y1="0" x2="640" y2="480" />
            </g>

            {/* San Francisco Bay Water in upper right */}
            <path
              d="M 520,30 Q 600,70 700,50 L 800,40 L 800,220 Q 720,240 640,210 Q 560,180 520,130 Z"
              fill="url(#bayWater)"
              opacity="0.9"
            />
            {/* Bay Waves & Sailboat */}
            <path d="M 680,110 Q 695,105 710,110" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
            <path d="M 720,150 Q 735,145 750,150" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
            <path d="M 740,85 L 752,95 L 740,95 Z" fill="#38bdf8" opacity="0.8" />
            <path d="M 738,82 L 738,98" stroke="#ffffff" strokeWidth="1.5" />
            <text x="730" y="180" fill="#38bdf8" fontSize="10" fontWeight="600" letterSpacing="1" opacity="0.7">
              BAÍA DE SF
            </text>

            {/* Golden Gate Bridge representation */}
            <g opacity="0.7" transform="translate(60, 45)">
              <line x1="20" y1="65" x2="20" y2="10" stroke="#f43f5e" strokeWidth="3" />
              <line x1="120" y1="65" x2="120" y2="10" stroke="#f43f5e" strokeWidth="3" />
              <path d="M 0,35 Q 20,45 70,55 Q 120,45 140,35" stroke="#f43f5e" strokeWidth="2" fill="none" />
              <line x1="0" y1="55" x2="140" y2="55" stroke="#f43f5e" strokeWidth="1.5" />
            </g>

            {/* Downtown SF Skyline in background */}
            <g opacity="0.3" fill="#64748b" transform="translate(480, 50)">
              <rect x="0" y="30" width="16" height="50" rx="2" />
              <rect x="22" y="10" width="22" height="70" rx="2" />
              <polygon points="50,15 62,0 74,15 74,80 50,80" />
              <rect x="80" y="25" width="26" height="55" rx="2" />
              <rect x="112" y="38" width="18" height="42" rx="2" />
            </g>

            {/* Bernal Heights Hill */}
            <path
              d="M 260,210 Q 380,80 510,130 Q 560,180 500,240 Q 380,260 260,210 Z"
              fill="url(#bernalHill)"
              opacity="0.8"
            />
            {/* Hill walking paths */}
            <path
              d="M 310,195 Q 380,140 430,130 Q 470,145 480,175"
              stroke="#34d399"
              strokeWidth="2.5"
              strokeDasharray="5,4"
              fill="none"
              opacity="0.9"
            />

            {/* Precita Park Greenery */}
            <rect x="520" y="310" width="160" height="45" rx="12" fill="url(#precitaGrass)" opacity="0.8" />

            {/* Road Network with glowing lines */}
            {/* Cortland Avenue (Main artery) */}
            <path
              d="M 80,310 C 180,300 240,350 360,320 C 460,290 560,340 740,300"
              stroke="#334155"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 80,310 C 180,300 240,350 360,320 C 460,290 560,340 740,300"
              stroke="#06b6d4"
              strokeWidth="2"
              strokeDasharray="6,8"
              fill="none"
              opacity="0.8"
            />

            {/* Bernal Heights Blvd loop */}
            <path
              d="M 230,230 C 270,180 340,110 440,115 C 500,125 540,210 480,265 C 400,295 300,285 230,230 Z"
              stroke="#1e293b"
              strokeWidth="10"
              fill="none"
            />

            {/* Cross-connectors */}
            <path d="M 450,230 L 620,440" stroke="#1e293b" strokeWidth="10" fill="none" strokeLinecap="round" />
            <path d="M 270,250 L 330,440" stroke="#1e293b" strokeWidth="10" fill="none" strokeLinecap="round" />
            <path d="M 120,200 L 220,430" stroke="#1e293b" strokeWidth="8" fill="none" strokeLinecap="round" />

            {/* Street Name Labels */}
            <text x="310" y="340" fill="#38bdf8" fontSize="11" fontWeight="700" transform="rotate(-3, 310, 340)">
              Cortland Ave
            </text>
            <text x="260" y="115" fill="#94a3b8" fontSize="10" fontWeight="600">
              Cortland Ave
            </text>
            <text x="560" y="390" fill="#94a3b8" fontSize="10" fontWeight="600" transform="rotate(48, 560, 390)">
              Folsom St
            </text>
            <text x="645" y="315" fill="#94a3b8" fontSize="10" fontWeight="600" transform="rotate(32, 645, 315)">
              Precita Ave
            </text>
            <text x="470" y="445" fill="#94a3b8" fontSize="11" fontWeight="600">
              Mission St
            </text>

            {/* Compass Rose */}
            <g transform="translate(730, 48)">
              <circle cx="0" cy="0" r="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
              <polygon points="0,-10 3,0 0,2 -3,0" fill="#22d3ee" />
              <polygon points="0,10 3,0 0,-2 -3,0" fill="#64748b" />
              <text x="-3" y="-12" fontSize="8" fontWeight="bold" fill="#22d3ee">N</text>
            </g>

            {/* Interactive Location Markers with glowing glass badges */}

            {/* 1. Bernal Heights Park (Summit) */}
            <g
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={(e) => handlePinClick(e as any, 'bernal-heights-park')}
              transform="translate(410, 145)"
            >
              <rect x="-60" y="-30" width="120" height="26" rx="13" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
              <text x="-48" y="-13" fill="#a7f3d0" fontSize="10" fontWeight="800" letterSpacing="0.5">
                BERNAL HEIGHTS
              </text>
              <text x="-48" y="-4" fill="#34d399" fontSize="8" fontWeight="700">
                PARQUE  🐾
              </text>
              <circle cx="0" cy="8" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            </g>

            {/* 2. Luna's Dog Park */}
            <g
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={(e) => handlePinClick(e as any, 'lunas-dog-park')}
              transform="translate(560, 205)"
            >
              <rect x="-42" y="-22" width="84" height="20" rx="10" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5" />
              <text x="-34" y="-8" fill="#e9d5ff" fontSize="8.5" fontWeight="700">
                PARQUE DA LUNA 🦴
              </text>
              <circle cx="0" cy="6" r="5" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
            </g>

            {/* 3. Woof & Meow Cafe */}
            <g
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={(e) => handlePinClick(e as any, 'woof-and-meow-cafe')}
              transform="translate(300, 290)"
            >
              <rect x="-46" y="-20" width="92" height="18" rx="9" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
              <text x="-40" y="-7" fill="#67e8f9" fontSize="7.5" fontWeight="700">
                CAFÉ WOOF & MEOW ☕
              </text>
              <circle cx="0" cy="5" r="5" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
            </g>

            {/* 4. The Barkery */}
            <g
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={(e) => handlePinClick(e as any, 'the-barkery')}
              transform="translate(530, 345)"
            >
              <rect x="-38" y="-18" width="76" height="16" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="-32" y="-6" fill="#fde68a" fontSize="7.5" fontWeight="700">
                PADARIA PET 🥨
              </text>
              <circle cx="0" cy="5" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            </g>
          </svg>

          {/* Floating Pill: "San Francisco, CA" */}
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md shadow-lg text-white text-xs sm:text-sm font-bold border border-white/20">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>San Francisco, CA</span>
          </div>

          {/* Floating Action: "View Map Details" button */}
          <div className="absolute bottom-3 right-3 z-20">
            <button
              id="view-map-details-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenFullMap) onOpenFullMap();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-[11px] sm:text-xs font-semibold shadow-lg shadow-cyan-500/30 border border-cyan-300/30 transition-all transform active:scale-95"
            >
              <span>Ver Detalhes do Mapa</span>
              <Navigation className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Selected Pin Quick Preview Tray */}
        {activeSpot && (
          <div
            className="mt-3 p-3 bg-white/10 backdrop-blur-md rounded-[16px] border border-white/20 flex items-center justify-between animate-fadeIn text-white"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectSpot) onSelectSpot(activeSpot);
            }}
          >
            <div className="flex items-center gap-2.5">
              <img
                src={activeSpot.imageUrl}
                alt={activeSpot.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover border border-white/20"
              />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {activeSpot.name}
                </h4>
                <p className="text-[11px] text-white/70 flex items-center gap-1">
                  <span>{activeSpot.distance}</span> • <span className="text-amber-400">★ {activeSpot.buddyRating}</span>
                </p>
              </div>
            </div>
            <button
              id="spot-quick-view-btn"
              className="text-xs font-bold text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/40 hover:bg-cyan-500/30"
            >
              Ver Local
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
