
/**
 * NAVIGATION.TSX - GLOBAL NAVIGATION COMPONENT
 * ===========================================
 * 
 * Kipengele cha uongozaji wa kimataifa - Global navigation component
 * 
 * MAIN FUNCTIONALITY / KAZI KEKUU:
 * - Global navigation across all pages (Uongozaji wa kimataifa kwa kurasa zote)
 * - Multi-language support (English/Swahili) (Msaada wa lugha nyingi)
 * - Responsive design for mobile and desktop (Muundo unaojibu kwa simu na kompyuta)
 * - User authentication state display (Onyesho la hali ya uthibitisho wa mtumiaji)
 * - Active page highlighting (Kuangazia ukurasa unaotumika)
 * 
 * KEY FEATURES / VIPENGELE VIKUU:
 * - Brand logo with home link (Nembo ya chapa na kiungo cha nyumbani)
 * - Primary navigation menu (Menyu ya uongozaji wa msingi)
 * - Language toggle (Kubadili lugha)
 * - Mobile hamburger menu (Menyu ya simu)
 * - User account access (Ufikiaji wa akaunti ya mtumiaji)
 * 
 * NAVIGATION STRUCTURE / MUUNDO WA UONGOZAJI:
 * - Home: Landing page (Ukurasa wa kwanza)
 * - Browse: Property listings (Orodha ya nyumba)
 * - Dashboard: Host/Landlord panel (Dashibodi ya mwenye nyumba)
 * - Authentication: Sign in/up (Kuingia/Kujisajili)
 * 
 * RESPONSIVE BEHAVIOR / TABIA YA KUJIBU:
 * - Desktop: Horizontal navigation bar
 * - Mobile: Collapsible hamburger menu
 * - Tablet: Adaptive layout
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, User, Menu, X, Globe, Building2, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

/**
 * Global Navigation Component
 * Kipengele cha uongozaji wa kimataifa
 * 
 * This component appears on every page and provides the main navigation
 * structure for the entire application with multi-language support.
 * 
 * Kipengele hiki kinaonekana kila ukurasa na kinatoa muundo wa uongozaji
 * wa msingi kwa programu nzima na msaada wa lugha nyingi.
 */
const Navigation = () => {
  // Component state management
  // Usimamizi wa hali ya kipengee
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu visibility
  const [language, setLanguage] = useState('sw'); // Current language (Swahili default)
  const location = useLocation(); // Current page location for active states
  const { user, signOut } = useAuth(); // Authentication state

  /**
   * Translation Configuration / Mipangilio ya Tafsiri
   * 
   * Supports English and Swahili languages for all navigation elements.
   * This makes the platform accessible to both local and international users.
   * 
   * Inasaidia lugha za Kiingereza na Kiswahili kwa vipengele vyote vya uongozaji.
   * Hii inafanya jukwaa lifikike kwa watumiaji wa ndani na kimataifa.
   */
  const translations = {
    en: {
      home: 'Home',
      browse: 'Browse Properties',
      dashboard: 'Host Dashboard',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      language: 'Language',
      becomeHost: 'Become a Host'
    },
    sw: {
      home: 'Nyumbani',
      browse: 'Tazama Nyumba',
      dashboard: 'Dashibodi ya Mwenye Nyumba',
      signIn: 'Ingia',
      signUp: 'Jisajili',
      signOut: 'Toka',
      language: 'Lugha',
      becomeHost: 'Kuwa Mwenye Nyumba'
    }
  };

  // Get current language translations
  // Pata tafsiri za lugha ya sasa
  const t = translations[language as keyof typeof translations];

  /**
   * Language Toggle Function
   * Utendakazi wa kubadilisha lugha
   * 
   * Switches between English and Swahili interface languages
   * Inabadilisha kati ya lugha za Kiingereza na Kiswahili
   */
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo Section - Sehemu ya nembo ya chapa */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-xl">
              <Home className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-primary">Nyumba</span>
              <span className="text-2xl font-bold text-serengeti-600">Link</span>
            </div>
          </Link>

          {/* Desktop Navigation Menu - Menyu ya uongozaji wa kompyuta */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Browse Properties Link - Kiungo cha kutazama nyumba */}
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
            
            {/* Host Dashboard Link - Kiungo cha dashibodi ya mwenye nyumba */}
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

          {/* Desktop Right Side Controls - Vidhibiti vya upande wa kulia vya kompyuta */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Toggle Button - Kitufe cha kubadilisha lugha */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </Button>

            {/* User Account Menu - Menyu ya akaunti ya mtumiaji */}
            {user ? (
              <Button
                variant="ghost"
                onClick={signOut}
                className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                <span>{t.signOut}</span>
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/signin">
                  <Button variant="ghost" size="sm">
                    {t.signIn}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    {t.signUp}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button - Kitufe cha menyu ya simu */}
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

        {/* Mobile Navigation Menu - Menyu ya uongozaji wa simu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Browse Link - Kiungo cha kutazama kwa simu */}
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
              
              {/* Mobile Dashboard Link - Kiungo cha dashibodi kwa simu */}
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

              {/* Mobile User Actions Section - Sehemu ya vitendo vya mtumiaji kwa simu */}
              <div className="border-t pt-4 mt-4">
                {/* Mobile Language Toggle - Kubadilisha lugha kwa simu */}
                <Button
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="w-full justify-start px-4 py-3 hover:bg-gray-100 rounded-lg"
                >
                  <Globe className="h-5 w-5 mr-3 text-gray-400" />
                  {t.language} ({language.toUpperCase()})
                </Button>
                
                {/* Mobile Sign In Link - Kiungo cha kuingia kwa simu */}
                <Link to="/signin" className="block mt-2">
                  <Button variant="ghost" className="w-full justify-start px-4 py-3 hover:bg-gray-100 rounded-lg">
                    <User className="h-5 w-5 mr-3 text-gray-400" />
                    {t.signIn}
                  </Button>
                </Link>
                
                {/* Mobile Sign Up Button - Kitufe cha kujisajili kwa simu */}
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
