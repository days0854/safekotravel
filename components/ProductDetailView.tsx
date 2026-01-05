import React from 'react';
import { TourPackage } from '../types';
import { Star, MapPin, Check, ShieldCheck, Clock } from 'lucide-react';

interface ProductDetailViewProps {
  product: TourPackage;
  isPreview?: boolean;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product, isPreview = false }) => {
  return (
    <div className={`bg-white ${isPreview ? '' : 'min-h-screen pb-20'}`}>
      {/* Product Hero Image */}
      <div className="relative h-[400px] md:h-[500px] w-full bg-gray-200">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map(tag => (
              <span key={tag} className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {tag}
              </span>
            ))}
             <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 uppercase">
                {product.category || 'General'}
             </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg leading-tight">{product.title}</h1>
          <div className="flex items-center text-white/90 space-x-6 text-sm md:text-base font-medium">
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> {product.location}</span>
            <span className="flex items-center"><Star className="w-4 h-4 mr-1.5 text-yellow-400 fill-yellow-400" /> {product.rating} ({product.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        
        {/* Main Content (Blog Style) */}
        <div className="lg:col-span-2">
          
          {/* Quick Info Bar */}
          <div className="flex justify-between bg-slate-50 p-6 rounded-2xl border border-gray-100 mb-10 shadow-sm">
             <div className="text-center flex-1">
                <div className="text-gray-400 text-xs uppercase font-bold mb-1">Duration</div>
                <div className="text-slate-800 font-semibold flex justify-center items-center"><Clock className="w-4 h-4 mr-1" /> ~8 Hrs</div>
             </div>
             <div className="w-px bg-gray-200"></div>
             <div className="text-center flex-1">
                <div className="text-gray-400 text-xs uppercase font-bold mb-1">Language</div>
                <div className="text-slate-800 font-semibold">English / Korean</div>
             </div>
              <div className="w-px bg-gray-200"></div>
             <div className="text-center flex-1">
                <div className="text-gray-400 text-xs uppercase font-bold mb-1">Safety</div>
                <div className="text-slate-800 font-semibold flex justify-center items-center text-green-600"><ShieldCheck className="w-4 h-4 mr-1" /> Verified</div>
             </div>
          </div>

          {/* Short Description */}
          {product.description && (
             <div className="mb-10 bg-primary/5 p-6 rounded-xl border-l-4 border-primary">
                <p className="text-slate-700 leading-relaxed text-lg font-medium italic">"{product.description}"</p>
             </div>
          )}

          {/* Dynamic Content Blocks - Blog Flow */}
          <div className="space-y-6">
            {product.contentBlocks?.map((block) => {
              if (block.type === 'header') {
                return <h3 key={block.id} className="text-2xl md:text-3xl font-bold text-slate-800 mt-12 mb-4 first:mt-0">{block.value}</h3>;
              }
              if (block.type === 'paragraph') {
                return <p key={block.id} className="text-slate-600 text-lg leading-8 whitespace-pre-line">{block.value}</p>;
              }
              if (block.type === 'image') {
                return (
                  <div key={block.id} className="my-8">
                    <div className="rounded-xl overflow-hidden shadow-md">
                        <img src={block.value} alt={block.caption || 'Tour image'} className="w-full h-auto" />
                    </div>
                    {block.caption && <div className="mt-3 text-sm text-gray-500 text-center">{block.caption}</div>}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-500 font-medium">Price per person</span>
              <div className="text-right">
                {product.discount && (
                  <div className="text-sm text-gray-400 line-through">${(product.price * (1 + product.discount/100)).toFixed(0)}</div>
                )}
                <div className="text-4xl font-bold text-primary">${product.price}</div>
              </div>
            </div>

            <div className="space-y-4 mb-8 bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-600 font-medium">Free cancellation (24h)</span>
              </div>
              <div className="flex items-start">
                 <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-600 font-medium">Instant Confirmation</span>
              </div>
               <div className="flex items-start">
                 <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-600 font-medium">Mobile voucher accepted</span>
              </div>
            </div>

            <button 
              disabled={isPreview}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform active:scale-95 ${
                isPreview ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-rose-600 hover:shadow-xl'
              }`}
            >
              {isPreview ? 'Booking Disabled (Preview)' : 'Check Availability'}
            </button>
            
            {!isPreview && (
               <p className="text-center text-xs text-gray-400 mt-4 flex justify-center items-center">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Secure payment via Safeko Pay
               </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
