import React, { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AIPlannerPage } from './pages/AIPlannerPage';
import { AdminPage } from './pages/AdminPage';
import { ProductPage } from './pages/ProductPage';
import { CategoryPage } from './pages/CategoryPage';
import { Footer } from './components/Footer';
import { User } from './types';

// Wrapper component to handle page state for Navbar logic
const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User | null>(null);

  const handleNavigate = (page: string) => {
    setActiveTab(page);
    if (page === 'home') navigate('/');
    else if (page === 'planner') navigate('/planner');
    else if (page === 'admin') navigate('/admin');
    else if (page === 'tours' || page === 'deals') navigate('/'); // Fallbacks
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    // Persist to local storage if needed, but for demo state is enough
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Determine if we should show Navbar/Footer
  const hideChrome = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!hideChrome && (
        <Navbar 
          onNavigate={handleNavigate} 
          currentPage={activeTab} 
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      )}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planner" element={<AIPlannerPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
        </Routes>
      </main>
      
      {!hideChrome && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
