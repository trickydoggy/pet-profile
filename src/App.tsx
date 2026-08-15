import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { AboutScreen } from './components/screens/AboutScreen';
import { GalleryScreen } from './components/screens/GalleryScreen';
import { LocationScreen } from './components/screens/LocationScreen';
import { PlaydateModal } from './components/modals/PlaydateModal';
import { ContactModal } from './components/modals/ContactModal';
import { PhotoLightboxModal } from './components/modals/PhotoLightboxModal';
import { SpotDetailModal } from './components/modals/SpotDetailModal';
import { GALLERY_PHOTOS, NEIGHBORHOOD_SPOTS } from './data/buddyData';
import { ActiveTab, GalleryPhoto, NeighborhoodSpot } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [isPlaydateOpen, setIsPlaydateOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [selectedSpot, setSelectedSpot] = useState<NeighborhoodSpot | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Handle escape key to close open modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPlaydateOpen(false);
        setIsContactOpen(false);
        setSelectedSpot(null);
        setSelectedPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePlanPlaydateAtSpot = (spot: NeighborhoodSpot) => {
    setSelectedSpot(spot);
    setIsPlaydateOpen(true);
  };

  const handlePhotoNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = GALLERY_PHOTOS.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % GALLERY_PHOTOS.length;
    setSelectedPhoto(GALLERY_PHOTOS[nextIndex]);
  };

  const handlePhotoPrev = () => {
    if (!selectedPhoto) return;
    const currentIndex = GALLERY_PHOTOS.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    setSelectedPhoto(GALLERY_PHOTOS[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Frosted Glass Ambient Glowing Orbs */}
      <div className="fixed top-[-100px] left-[-100px] w-[450px] h-[450px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-80px] right-[-80px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="fixed top-[45%] left-[-60px] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none z-0"></div>

      {/* Top Application Header */}
      <Header
        onOpenPlaydate={() => setIsPlaydateOpen(true)}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
      />

      {/* Main Content Area: Supports either Framed Phone View or Expanded Fluid Grid with Frosted Glass styling */}
      <main className="flex-1 flex justify-center py-4 sm:py-6 px-3 sm:px-6 relative z-10">
        <div
          className={`w-full transition-all duration-300 ${
            isMobileFrame
              ? 'max-w-md sm:border sm:border-white/15 sm:shadow-2xl sm:rounded-[36px] sm:bg-white/5 sm:backdrop-blur-xl sm:p-4 p-1'
              : 'max-w-4xl'
          }`}
        >
          {/* Active Screen Content */}
          {activeTab === 'home' && (
            <HomeScreen
              onNavigateToAbout={() => setActiveTab('about')}
              onNavigateToGallery={() => setActiveTab('gallery')}
              onNavigateToLocation={() => setActiveTab('location')}
              onSelectSpot={(spot) => setSelectedSpot(spot)}
              onOpenPlaydateModal={() => setIsPlaydateOpen(true)}
              onOpenContactModal={() => setIsContactOpen(true)}
            />
          )}

          {activeTab === 'about' && (
            <AboutScreen
              onOpenPlaydateModal={() => setIsPlaydateOpen(true)}
            />
          )}

          {activeTab === 'gallery' && (
            <GalleryScreen
              onSelectPhoto={(photo) => setSelectedPhoto(photo)}
            />
          )}

          {activeTab === 'location' && (
            <LocationScreen
              onSelectSpot={(spot) => setSelectedSpot(spot)}
              onPlanPlaydateAtSpot={handlePlanPlaydateAtSpot}
            />
          )}
        </div>
      </main>

      {/* Persistent Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        photoCount={GALLERY_PHOTOS.length}
        spotCount={NEIGHBORHOOD_SPOTS.length}
      />

      {/* Modals & Dialogs */}
      <PlaydateModal
        isOpen={isPlaydateOpen}
        onClose={() => setIsPlaydateOpen(false)}
        initialSpot={selectedSpot}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <PhotoLightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onNext={handlePhotoNext}
        onPrev={handlePhotoPrev}
      />

      <SpotDetailModal
        spot={selectedSpot}
        onClose={() => setSelectedSpot(null)}
        onPlanPlaydate={handlePlanPlaydateAtSpot}
      />
    </div>
  );
}
