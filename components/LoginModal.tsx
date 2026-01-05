import React, { useState } from 'react';
import { X, Mail, Facebook, Twitter, Instagram, Chrome } from 'lucide-react';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [loading, setLoading] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSocialLogin = (provider: User['provider']) => {
    setLoading(provider);
    
    // Simulate API delay
    setTimeout(() => {
      const mockUser: User = {
        id: Date.now().toString(),
        name: 'Traveler Kim',
        email: `user@${provider}.com`,
        provider: provider,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`
      };
      
      onLoginSuccess(mockUser);
      setLoading(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Welcome to Safeko</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <p className="text-gray-500 mb-8 text-center">
            Sign up to track your trips, save favorites, and get exclusive deals.
          </p>

          <div className="space-y-3">
            <button 
              onClick={() => handleSocialLogin('google')}
              disabled={!!loading}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors relative group"
            >
              {loading === 'google' ? (
                <div className="w-5 h-5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Chrome className="w-5 h-5 text-red-500 mr-3" />
                  <span className="font-semibold text-slate-700">Continue with Google</span>
                </>
              )}
            </button>

            <button 
              onClick={() => handleSocialLogin('apple')}
              disabled={!!loading}
              className="w-full flex items-center justify-center py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors relative"
            >
               {loading === 'apple' ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="mr-3 font-bold text-xl leading-none pb-1"></span>
                  <span className="font-semibold">Continue with Apple</span>
                </>
              )}
            </button>

            <button 
              onClick={() => handleSocialLogin('facebook')}
              disabled={!!loading}
              className="w-full flex items-center justify-center py-3 px-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition-colors relative"
            >
               {loading === 'facebook' ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Facebook className="w-5 h-5 mr-3 fill-current" />
                  <span className="font-semibold">Continue with Facebook</span>
                </>
              )}
            </button>
            
            <div className="grid grid-cols-2 gap-3">
               <button 
                  onClick={() => handleSocialLogin('twitter')}
                  disabled={!!loading}
                  className="flex items-center justify-center py-3 px-4 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a94df] transition-colors"
                >
                  {loading === 'twitter' ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Twitter className="w-5 h-5 fill-current" />}
               </button>
               <button 
                  onClick={() => handleSocialLogin('instagram')}
                  disabled={!!loading}
                  className="flex items-center justify-center py-3 px-4 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {loading === 'instagram' ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Instagram className="w-5 h-5" />}
               </button>
            </div>
          </div>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="px-3 text-sm text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <button 
             onClick={() => handleSocialLogin('email')}
             className="w-full flex items-center justify-center py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-slate-600 font-semibold"
          >
             <Mail className="w-5 h-5 mr-2" />
             Continue with Email
          </button>
          
          <p className="mt-6 text-xs text-center text-gray-400">
             By continuing, you agree to Safeko's <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
