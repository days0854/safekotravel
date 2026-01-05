import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { TourPackage } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<TourPackage[]>([]);
  const [categoryName, setCategoryName] = useState('');

  const CATEGORY_MAP: Record<string, string> = {
    'beauty': 'Beauty & Wellness',
    'nightlife': 'Safe Nightlife',
    'religious': 'Religious Freedom',
    'dmz': 'DMZ Tours',
    'general': 'General Tours'
  };

  useEffect(() => {
    if (id) {
      setCategoryName(CATEGORY_MAP[id] || id.charAt(0).toUpperCase() + id.slice(1));
      setProducts(dataService.getProductsByCategory(id));
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
            <button 
                onClick={() => navigate('/')} 
                className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-50 mr-4 border border-gray-200"
            >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <h1 className="text-3xl font-bold text-slate-800">{categoryName}</h1>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🏝️</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">No tours found in this category yet.</h2>
            <p className="text-gray-500">Check back later or explore other destinations!</p>
            <button 
                onClick={() => navigate('/')}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-rose-600 transition-colors"
            >
                Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
