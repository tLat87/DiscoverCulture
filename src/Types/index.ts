export interface LocationData {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  rating: number;
  image: string;
  img?: any; // For require() image imports
  coordinates: {
    latitude: number;
    longitude: number;
  };
  features: string[];
  openingHours: string;
}

export interface MapLocation {
  id: string;
  name: string;
  category: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  color: string;
}

export interface ListLocation {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  distance: string;
  color: string;
  icon: string;
}

export interface FavoriteLocation {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  distance: string;
  color: string;
  icon: string;
  addedDate: string;
}

export interface Top5Location {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  distance: string;
  color: string;
  icon: string;
  badge: string;
  badgeColor: string;
  specialFeature: string;
}

export type CategoryType = 'restaurants' | 'cafes' | 'temples' | 'cultural' | 'markets' | 'golden-taste' | 'serene-spirit' | 'urban-bloom' | 'craft-culture' | 'tranquil-retreats';

export interface Category {
  id: CategoryType | 'all';
  name: string;
  color: string;
  icon: string;
  description: string;
}
