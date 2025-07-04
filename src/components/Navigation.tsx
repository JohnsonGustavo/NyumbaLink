
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, User, Menu, X, Globe, Heart, Building2 } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('sw');
  const location = useLocation();

  const translations = {
    en: {
      home: 'Home',
      browse: 'Browse Properties',
      dashboard: 'Host Dashboard',
      favorites: 'Favorites',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      language: 'Language',
      becomeHost: 'Become a Host'
    },
    sw: {
      home: 'Nyumbani',
      browse: 'Tazama Nyumba',
      dashboard: 'Dashibodi ya Mwenye Nyumba',
      favorites: 'Pendwa',
      signIn: 'Ingia',
      signUp: 'Jisajili',
      language: 'Lugha',
      becomeHost: 'Kuwa Mwenye Nyumba'
    }
  };

  const t = translations[language as keyof typeof translations];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-xl">
              <Home className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-primary">Nyumba</span>
              <span className="text-2xl font-bold text-serengeti-600">Link</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/browse">
              <Button
                variant="ghost"
                className={`px-4 py-2 rounded-full hover:bg-gray-100 ${
                  location.pathname === '/browse' ? 'bg-gray-100 font-semibold' : ''
                }`}
              >
                {t.browse}
              </Button>
            </Link>
            <Link to="/favorites">
              <Button
                variant="ghost"
                className={`px-4 py-2 rounded-full hover:bg-gray-100 flex items-center ${
                  location.pathname === '/favorites' ? 'bg-gray-100 font-semibold' : ''
                }`}
              >
                <Heart className="h-4 w-4 mr-2" />
                {t.favorites}
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="ghost"
                className={`px-4 py-2 rounded-full hover:bg-gray-100 ${
                  location.pathname === '/dashboard' ? 'bg-gray-100 font-semibold' : ''
                }`}
              >
                {t.becomeHost}
              </Button>
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </Button>

            {/* User menu */}
            <div className="flex items-center border rounded-full p-1 hover:shadow-md transition-shadow cursor-pointer">
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-4 w-4" />
              </Button>
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center ml-1">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/browse"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Search className="h-5 w-5 mr-3 text-gray-400" />
                  {t.browse}
                </div>
              </Link>
              
              <Link
                to="/favorites"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-3 text-gray-400" />
                  {t.favorites}
                </div>
              </Link>
              
              <Link
                to="/dashboard"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 mr-3 text-gray-400" />
                  {t.becomeHost}
                </div>
              </Link>

              <div className="border-t pt-4 mt-4">
                <Button
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="w-full justify-start px-4 py-3 hover:bg-gray-100 rounded-lg"
                >
                  <Globe className="h-5 w-5 mr-3 text-gray-400" />
                  {t.language} ({language.toUpperCase()})
                </Button>
                
                <Link to="/signin" className="block mt-2">
                  <Button variant="ghost" className="w-full justify-start px-4 py-3 hover:bg-gray-100 rounded-lg">
                    <User className="h-5 w-5 mr-3 text-gray-400" />
                    {t.signIn}
                  </Button>
                </Link>
                
                <Link to="/signup" className="block mt-2">
                  <Button className="w-full mt-2 bg-primary hover:bg-primary/90">
                    {t.signUp}
                  </Button>
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
