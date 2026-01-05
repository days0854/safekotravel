import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { TourPackage } from '../types';
import { ProductDetailView } from '../components/ProductDetailView';
import { ArrowLeft } from 'lucide-react';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<TourPackage | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const found = dataService.getProductById(id);
      if (found) {
        setProduct(found);
      } else {
        // Handle 404
        navigate('/');
      }
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button Overlay */}
      <div className="fixed top-20 left-4 z-40 md:left-8">
        <button 
          onClick={() => navigate(-1)} 
          className="bg-white/90 backdrop-blur shadow-md p-2 rounded-full hover:bg-white transition-colors border border-gray-200"
        >
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </button>
      </div>

      <ProductDetailView product={product} />
    </div>
  );
};
