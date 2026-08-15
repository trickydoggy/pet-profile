export type ActiveTab = 'home' | 'about' | 'gallery' | 'location';

export interface Trait {
  label: string;
  type: 'sage' | 'peach' | 'terracotta';
}

export interface NeighborhoodSpot {
  id: string;
  name: string;
  category: 'park' | 'cafe' | 'bakery' | 'trail';
  address: string;
  distance: string;
  description: string;
  buddyRating: number;
  buddyTip: string;
  amenities: string[];
  imageUrl: string;
  coordinates: { x: number; y: number }; // percentage on map canvas
  bestTimeToVisit: string;
  leashRule: 'Sem coleira permitido' | 'Apenas com coleira' | 'Parque cercado para cães';
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'park' | 'naps' | 'puppy' | 'friends';
  imageUrl: string;
  date: string;
  location: string;
  caption: string;
  likes: number;
  boops: number;
}

export interface DailyRoutineItem {
  time: string;
  activity: string;
  icon: string;
  description: string;
}

export interface PlaydateBooking {
  dogName: string;
  dogBreed: string;
  energyLevel: 'chill' | 'medium' | 'high' | 'zoomies';
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  locationId: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}
