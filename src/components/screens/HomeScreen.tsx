import React from 'react';
import { HeroCard } from '../HeroCard';
import { AboutCard } from '../AboutCard';
import { NeighborhoodCard } from '../NeighborhoodCard';
import { PlayCard } from '../PlayCard';
import { NeighborhoodSpot } from '../../types';

interface HomeScreenProps {
  onNavigateToAbout: () => void;
  onNavigateToGallery: () => void;
  onNavigateToLocation: () => void;
  onSelectSpot: (spot: NeighborhoodSpot) => void;
  onOpenPlaydateModal: () => void;
  onOpenContactModal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToAbout,
  onNavigateToGallery,
  onNavigateToLocation,
  onSelectSpot,
  onOpenPlaydateModal,
  onOpenContactModal,
}) => {
  return (
    <div className="space-y-6 pb-24">
      {/* 1. Main Hero Portrait matching screenshot */}
      <HeroCard onExploreMore={onNavigateToGallery} />

      {/* 2. About Me Card matching screenshot */}
      <AboutCard onViewDetails={onNavigateToAbout} />

      {/* 3. Let's Play Contact Card matching screenshot */}
      <PlayCard
        onEmailClick={onOpenContactModal}
        onCallClick={onOpenContactModal}
        onPlaydateClick={onOpenPlaydateModal}
      />
    </div>
  );
};
