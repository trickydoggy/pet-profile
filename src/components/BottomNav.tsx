import React from 'react';
import { Home, Info, Image, MapPin, Map, PawPrint } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  photoCount?: number;
  spotCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  photoCount = 6,
  spotCount = 5,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'home',
      label: 'Início',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'about',
      label: 'Sobre',
      icon: <Info className="w-5 h-5" />,
    },
    {
      id: 'gallery',
      label: 'Galeria',
      icon: <Image className="w-5 h-5" />,
      badge: photoCount,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-2xl border-t border-white/10 py-2.5 px-4 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`group flex flex-col items-center justify-center transition-all relative py-1 px-3 rounded-2xl ${
                isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
              }`}
            >
              {/* Icon Container with glowing active pill */}
              <div
                className={`w-14 h-8 sm:w-16 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105 border border-cyan-400/40'
                    : 'text-white/60 group-hover:bg-white/10'
                }`}
              >
                {item.icon}
                {item.badge && !isActive && (
                  <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-extrabold flex items-center justify-center shadow">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label below icon */}
              <span
                className={`text-xs mt-1 transition-all ${
                  isActive ? 'font-bold text-white' : 'font-medium text-white/50'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
