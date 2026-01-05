export interface ContentBlock {
  id: string;
  type: 'header' | 'paragraph' | 'image';
  value: string;
  caption?: string; // Only used for images
}

export interface TourPackage {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  tags: string[];
  discount?: number;
  category?: 'beauty' | 'nightlife' | 'religious' | 'dmz' | 'general';
  description?: string; // Short summary
  contentBlocks?: ContentBlock[]; // Detailed content
}

export interface Destination {
  id: string;
  name: string;
  imageUrl: string;
}

export enum TravelStyle {
  RELAXED = 'Relaxed',
  ADVENTURE = 'Adventure',
  CULTURAL = 'Cultural',
  FOODIE = 'Foodie',
  SHOPPING = 'Shopping'
}

export interface AIPlanRequest {
  destination: string;
  duration: string;
  style: TravelStyle;
  budget?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    activity: string;
    description: string;
  }[];
}

export interface AIPlanResponse {
  itinerary: ItineraryDay[];
  summary: string;
  estimatedCost: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: 'google' | 'facebook' | 'apple' | 'twitter' | 'instagram' | 'email';
}
