import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { TourPackage } from '../types';
import { dataService } from '../services/dataService';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const THEMES = [
  { 
    id: 'beauty', 
    name: 'Beauty & Wellness', 
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Spa/Facial
  },
  { 
    id: 'nightlife', 
    name: 'Safe Nightlife', 
    imageUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Seoul City Night
  },
  { 
    id: 'religious', 
    name: 'Religious Freedom', 
    imageUrl: 'https://images.unsplash.com/photo-1583486334584-c946f3a39df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Korean Temple
  },
  { 
    id: 'dmz', 
    name: 'DMZ Tours', 
    imageUrl: 'https://images.unsplash.com/photo-1596426463945-8463e2601264?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // DMZ/Border
  },
];

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<TourPackage[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from our client-side CMS service
    setProducts(dataService.getProducts());
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Themes Section (Replaces Top Destinations) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Top Destinations</h2>
            <button className="text-primary text-sm font-semibold flex items-center hover:underline">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {THEMES.map((theme) => (
              <div 
                key={theme.id} 
                onClick={() => navigate(`/category/${theme.id}`)}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md h-80"
              >
                <img 
                  src={theme.imageUrl} 
                  alt={theme.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <span className="text-white text-xl md:text-2xl font-bold">{theme.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safeko Travel Promotion Section (Renamed from Best Sellers) */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Safeko Travel Promotion</h2>
             <button className="text-primary text-sm font-semibold flex items-center hover:underline">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x">
            {products.length > 0 ? (
              products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))
            ) : (
              <p className="text-gray-400 italic">No tours available yet. Add them in the Admin CMS.</p>
            )}
          </div>
        </div>
      </section>

      {/* Massage Promo Banner (Renamed from Winter Ski) */}
      <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4">
             <div className="relative rounded-2xl overflow-hidden h-64 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  className="w-full h-full object-cover" 
                  alt="Massage Promotion" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-8 md:px-16">
                    <h3 className="text-3xl font-bold text-white mb-4">Premium Massage & Spa Experience</h3>
                    <p className="text-white/90 mb-6 max-w-md">Relax and rejuvenate with our exclusive massage experience tickets at the best prices.</p>
                    <button className="w-fit bg-primary text-white font-bold py-2.5 px-6 rounded-md hover:bg-rose-600 transition-colors">
                        Book Now
                    </button>
                </div>
             </div>
          </div>
      </section>

      {/* New & Trending */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">New & Trending</h2>
             <button className="text-primary text-sm font-semibold flex items-center hover:underline">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {products.slice().reverse().slice(0, 4).map((p) => (
                <ProductCard key={`trend-${p.id}`} product={p} />
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};
