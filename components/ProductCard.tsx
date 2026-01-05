import React from 'react';
import { Star, Zap } from 'lucide-react';
import { TourPackage } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: TourPackage;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer border border-gray-100 min-w-[280px] w-full md:max-w-sm flex-shrink-0"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-2 py-1 rounded flex items-center">
            <Zap className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
            Instant Confirmation
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
          <span>{product.location}</span>
          <span>•</span>
          <span className="text-primary truncate max-w-[150px]">{product.tags[0]}</span>
        </div>
        
        <h3 className="text-slate-800 font-bold text-lg mb-2 line-clamp-2 h-14 leading-tight">
          {product.title}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-2">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
           <span className="text-xs text-gray-500">From</span>
           <div className="text-right">
              {product.discount && (
                 <span className="text-xs text-gray-400 line-through mr-2">${(product.price * (1 + product.discount/100)).toFixed(0)}</span>
              )}
              <span className="text-lg font-bold text-primary">${product.price}</span>
           </div>
        </div>
      </div>
    </div>
  );
};
