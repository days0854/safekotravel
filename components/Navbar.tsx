import React, { useState } from 'react';
import { Menu, Search, User as UserIcon, Globe, X, ChevronDown, LogOut } from 'lucide-react';
import { User } from '../types';
import { LoginModal } from './LoginModal';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  user: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, user, onLogin, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const thingsToDoSubItems = [
    { name: 'Beauty & Wellness', id: 'beauty' },
    { name: 'Safe Nightlife', id: 'nightlife' },
    { name: 'Religious Freedom', id: 'religious' },
    { name: 'DMZ Tours', id: 'dmz' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">Safeko<span className="text-primary">Travel</span></span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => onNavigate('home')}
                className={`text-sm font-medium transition-colors hover:text-primary ${currentPage === 'home' ? 'text-primary' : 'text-slate-600'}`}
              >
                Destinations
              </button>

              {/* Dropdown for Things to Do */}
              <div className="relative group">
                <button
                  onClick={() => onNavigate('tours')}
                  className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${currentPage === 'tours' ? 'text-primary' : 'text-slate-600'}`}
                >
                  Things to Do
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                    <div className="py-2">
                      {thingsToDoSubItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => onNavigate('tours')}
                          className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 last:border-0"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('planner')}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${currentPage === 'planner' ? 'text-primary' : 'text-slate-600'}`}
              >
                AI Planner
                <span className="absolute -top-3 -right-6 bg-accent text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  NEW
                </span>
              </button>

              <button
                onClick={() => onNavigate('deals')}
                className={`text-sm font-medium transition-colors hover:text-primary ${currentPage === 'deals' ? 'text-primary' : 'text-slate-600'}`}
              >
                Deals
              </button>
            </div>

            {/* Utilities */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative hidden lg:block">
                <input 
                  type="text" 
                  placeholder="Search destinations..." 
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-48 transition-all focus:w-64"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button className="text-slate-600 hover:text-primary">
                <Globe className="w-5 h-5" />
              </button>
              
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 text-slate-700 hover:text-primary font-medium text-sm border border-gray-200 rounded-full pl-1 pr-3 py-1 hover:border-primary transition-colors"
                  >
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name} 
                      className="w-6 h-6 rounded-full bg-gray-200"
                    />
                    <span className="max-w-[100px] truncate">{user.name}</span>
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-4 py-2 border-b border-gray-50">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 hover:text-primary">
                        My Bookings
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 hover:text-primary">
                        Wishlist
                      </button>
                      <button 
                        onClick={() => {
                          onLogout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center space-x-2 text-slate-600 hover:text-primary font-medium text-sm"
                >
                  <UserIcon className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-primary p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                 onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
                 className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary hover:bg-gray-50"
              >
                Destinations
              </button>
              
              <div className="pl-4 border-l-2 border-gray-100 ml-3 my-2">
                <p className="px-3 py-1 text-xs font-bold text-gray-400 uppercase">Things to Do</p>
                {thingsToDoSubItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate('tours'); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <button
                 onClick={() => { onNavigate('planner'); setIsMobileMenuOpen(false); }}
                 className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary hover:bg-gray-50"
              >
                AI Planner
              </button>
              <button
                 onClick={() => { onNavigate('deals'); setIsMobileMenuOpen(false); }}
                 className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary hover:bg-gray-50"
              >
                Deals
              </button>

              <div className="mt-4 pt-4 border-t border-gray-100 px-3">
                {user ? (
                   <div className="mb-3">
                     <div className="flex items-center mb-3">
                       <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                       <div>
                         <div className="text-sm font-bold text-slate-800">{user.name}</div>
                         <div className="text-xs text-gray-500">{user.email}</div>
                       </div>
                     </div>
                     <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left text-sm text-red-600 font-medium py-2">Sign Out</button>
                   </div>
                ) : (
                  <button 
                    onClick={() => { setIsLoginModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 bg-gray-50 rounded-lg"
                  >
                    Sign In / Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          onLogin(user);
          setIsLoginModalOpen(false);
        }}
      />
    </>
  );
};
