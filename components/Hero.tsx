import React from 'react';
import { Search, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[500px] w-full bg-slate-900 overflow-hidden">
      {/* Background Image */}
      <img 
        src="https://picsum.photos/1920/1080?grayscale&blur=2" 
        alt="Travel Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-md">
          Korea, the <span className="text-primary">Safest Country</span> in the World
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl font-light whitespace-pre-line leading-relaxed">
          But because of the lack of knowledge, you may find it hard to experience Korea as far as you want to discover
        </p>

        {/* Search Bar Container */}
        <div className="w-full max-w-3xl bg-white rounded-lg p-2 shadow-2xl flex flex-col md:flex-row items-center gap-2">
          <div className="flex-1 flex items-center px-4 py-2 w-full border-b md:border-b-0 md:border-r border-gray-100">
            <Search className="w-5 h-5 text-primary mr-3" />
            <input 
              type="text" 
              placeholder="Where are you going?" 
              className="w-full focus:outline-none text-slate-700 placeholder-gray-400"
            />
          </div>
          <div className="md:w-1/3 flex items-center px-4 py-2 w-full">
             <MapPin className="w-5 h-5 text-gray-400 mr-3" />
             <input 
              type="text" 
              placeholder="All Themes" 
              className="w-full focus:outline-none text-slate-700 placeholder-gray-400"
            />
          </div>
          <button className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-rose-600 text-white font-bold rounded-md transition-colors shadow-md">
            Search
          </button>
        </div>

        {/* Quick Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {['Jeju Island', 'Seoul Pass', 'Nami Island', 'DMZ Tour', 'Hanbok Rental'].map((tag) => (
            <span key={tag} className="px-4 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium cursor-pointer hover:bg-white/30 transition-all">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};