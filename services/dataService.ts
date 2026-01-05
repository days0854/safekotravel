import { TourPackage } from "../types";

const STORAGE_KEY = 'safeko_products_v2';

const DEFAULT_PRODUCTS: TourPackage[] = [
  {
    id: '1',
    title: 'Nami Island & Garden of Morning Calm Day Trip from Seoul',
    location: 'Gyeonggi-do',
    price: 45,
    rating: 4.8,
    reviews: 1240,
    imageUrl: 'https://picsum.photos/800/600?random=1',
    tags: ['Nature', 'Day Trip'],
    discount: 15,
    category: 'general',
    description: 'Escape the city and immerse yourself in the natural beauty of Nami Island and the Garden of Morning Calm.',
    contentBlocks: [
      { id: 'b1', type: 'header', value: 'Tour Highlights' },
      { id: 'b2', type: 'paragraph', value: 'Visit Nami Island, famous for its tree-lined avenues and as the filming location for the classic K-drama "Winter Sonata". Afterwards, explore the Garden of Morning Calm, a 30,000-square-meter arboretum hosted in a unique Korean garden style.' },
      { id: 'b3', type: 'image', value: 'https://picsum.photos/800/400?random=10', caption: 'Beautiful tree-lined path at Nami Island' },
      { id: 'b4', type: 'header', value: 'Itinerary' },
      { id: 'b5', type: 'paragraph', value: '08:00 AM - Depart from Hongik Univ. Station\n09:30 AM - Arrive at Nami Island\n13:00 PM - Lunch (Dakgalbi recommended)\n14:30 PM - Garden of Morning Calm\n17:00 PM - Return to Seoul' }
    ]
  },
  {
    id: '2',
    title: 'DMZ Tour: 3rd Tunnel & Suspension Bridge (No Shopping)',
    location: 'Paju',
    price: 52,
    rating: 4.9,
    reviews: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1596426463945-8463e2601264?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['History', 'Best Seller'],
    category: 'dmz',
    description: 'The most popular DMZ tour without forced shopping stops. See the reality of the divided nation.',
    contentBlocks: [
        { id: 'd1', type: 'header', value: 'Why this tour?' },
        { id: 'd2', type: 'paragraph', value: 'Unlike other low-cost tours, this package strictly prohibits forced shopping centers (Ginseng/Amethyst shops). You will spend more time at the actual historical sites.' },
        { id: 'd3', type: 'image', value: 'https://images.unsplash.com/photo-1596426463945-8463e2601264?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'The DMZ Fence' }
    ]
  },
  {
    id: '3',
    title: 'Everland Theme Park Discount Ticket (QR Code Entry)',
    location: 'Yongin',
    price: 38,
    rating: 4.7,
    reviews: 5800,
    imageUrl: 'https://picsum.photos/400/300?random=3',
    tags: ['Theme Park', 'Family'],
    discount: 30,
    category: 'general'
  },
  {
    id: '4',
    title: 'Han River E-Land Dinner Cruise with Live Jazz',
    location: 'Seoul',
    price: 65,
    rating: 4.6,
    reviews: 890,
    imageUrl: 'https://picsum.photos/400/300?random=4',
    tags: ['Romance', 'Night View'],
    category: 'nightlife'
  },
  {
    id: '5',
    title: 'K-Beauty Facial & Spa Treatment in Gangnam',
    location: 'Seoul',
    price: 120,
    rating: 4.9,
    reviews: 150,
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    tags: ['Wellness', 'Relaxation'],
    category: 'beauty'
  },
  {
    id: '6',
    title: 'Temple Stay Experience: Finding Inner Peace',
    location: 'Gyeongju',
    price: 80,
    rating: 4.8,
    reviews: 420,
    imageUrl: 'https://images.unsplash.com/photo-1583486334584-c946f3a39df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    tags: ['Culture', 'Spiritual'],
    category: 'religious'
  }
];

export const dataService = {
  getProducts: (): TourPackage[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Seed default data if empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    } catch (e) {
      console.error("Error reading from storage", e);
      return DEFAULT_PRODUCTS;
    }
  },

  getProductsByCategory: (category: string): TourPackage[] => {
    const products = dataService.getProducts();
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
  },

  getProductById: (id: string): TourPackage | undefined => {
    const products = dataService.getProducts();
    return products.find(p => p.id === id);
  },

  saveProduct: (product: TourPackage): void => {
    const products = dataService.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    
    if (index >= 0) {
      // Update
      products[index] = product;
    } else {
      // Add
      products.push(product);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  },

  deleteProduct: (id: string): void => {
    const products = dataService.getProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
