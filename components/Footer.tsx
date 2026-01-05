import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <span className="font-bold text-xl tracking-tight text-white">Safeko<span className="text-primary">Travel</span></span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Safeko Travel is your trusted partner for exploring Korea and Asia. We specialize in eco-friendly tours, safe bookings, and AI-personalized itineraries.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Discover</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">Seoul Tours</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Jeju Island</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">K-Pop Experiences</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Ski Resorts</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            {onNavigate && (
              <li>
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="hover:text-primary transition-colors text-left"
                >
                  Admin Login
                </button>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Stay Connected</h4>
          <div className="flex space-x-4 mb-6">
            <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
          <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
             <input type="email" placeholder="Email Address" className="bg-transparent px-3 py-2 text-sm w-full focus:outline-none" />
             <button className="bg-primary hover:bg-rose-600 px-3 py-2">
                <Mail className="w-4 h-4 text-white" />
             </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center relative">
        <div className="text-xs text-gray-500 mb-2">
          &copy; {new Date().getFullYear()} Safeko Travel. All rights reserved.
        </div>
        <div className="text-sm font-medium text-gray-400 mb-2">
          Your Safe Travel Begins Here
        </div>
        <div className="text-xs text-gray-600 font-medium">
          CEO Dayoong Kim
        </div>
      </div>
    </footer>
  );
};