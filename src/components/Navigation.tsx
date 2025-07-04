
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, User, Menu, X, Globe, Heart } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  const translations = {
    en: {
      home: 'Home',
      browse: 'Browse Properties',
      dashboard: 'Dashboard',
      favorites: 'Favorites',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      language: 'Language'
    },
    sw: {
      home: 'Nyumbani',
      browse: 'Tazama Nyumba',
      dashboard: 'Dashibodi',
      favorites: 'Pendwa',
      signIn: 'Ingia',
      signUp: 'Jisajili',
      language: 'Lugha'
    }
  };

  const t = translations[language as keyof typeof translations];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Nyumba Link</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-primary transition-colors ${
                location.pathname === '/' ? 'text-primary font-semibold' : ''
              }`}
            >
              {t.home}
            </Link>
            <Link 
              to="/browse" 
              className={`text-gray-700 hover:text-primary transition-colors ${
                location.pathname === '/browse' ? 'text-primary font-semibold' : ''
              }`}
            >
              {t.browse}
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-gray-700 hover:text-primary transition-colors ${
                location.pathname === '/dashboard' ? 'text-primary font-semibold' : ''
              }`}
            >
              {t.dashboard}
            </Link>
            <Link 
              to="/favorites" 
              className={`text-gray-700 hover:text-primary transition-colors ${
                location.pathname === '/favorites' ? 'text-primary font-semibold' : ''
              }`}
            >
              <Heart className="h-4 w-4 inline mr-1" />
              {t.favorites}
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span>{language.toUpperCase()}</span>
            </Button>
            <Link to="/signin">
              <Button variant="ghost">{t.signIn}</Button>
            </Link>
            <Link to="/signup">
              <Button>{t.signUp}</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.home}
              </Link>
              <Link
                to="/browse"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.browse}
              </Link>
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.dashboard}
              </Link>
              <Link
                to="/favorites"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.favorites}
              </Link>
              <div className="border-t pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="w-full justify-start mb-2"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language.toUpperCase()}
                </Button>
                <Link to="/signin" className="block w-full mb-2">
                  <Button variant="ghost" className="w-full">
                    {t.signIn}
                  </Button>
                </Link>
                <Link to="/signup" className="block w-full">
                  <Button className="w-full">{t.signUp}</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
