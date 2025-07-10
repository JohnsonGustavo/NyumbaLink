
/**
 * HEROSECTION.TSX - MAIN SEARCH AND HERO COMPONENT
 * ================================================
 * 
 * Sehemu ya utafutaji mkuu wa Nyumba Link - Main search section for Nyumba Link
 * 
 * FUNCTIONALITY / KAZI:
 * - Primary landing section with search capabilities (Sehemu ya kwanza na utafutaji)
 * - Location-based property search (Utafutaji wa nyumba kulingana na eneo)
 * - Price range filtering (Kichujio cha bei)
 * - Hero banner with motivational messaging (Ujumbe wa kuhamasisha)
 * - Platform statistics display (Onyesho la takwimu za jukwaa)
 * 
 * STATE MANAGEMENT / USIMAMIZI WA HALI:
 * - searchLocation: User's location input (Ingizo la eneo la mtumiaji)
 * - minPrice: Minimum price filter (Kichujio cha bei ya chini)
 * - maxPrice: Maximum price filter (Kichujio cha bei ya juu)
 * 
 * USER JOURNEY / SAFARI YA MTUMIAJI:
 * 1. User lands on homepage (Mtumiaji anafika ukurasa wa kwanza)
 * 2. Enters search criteria (Anaingiza vigezo vya utafutaji)
 * 3. Clicks search button (Anabonyeza kitufe cha utafutaji)
 * 4. Navigates to Browse page with filters (Anaenda ukurasa wa Browse na vichujio)
 * 
 * DESIGN FEATURES / VIPENGELE VYA MUUNDO:
 * - Background hero image (Picha ya nyuma ya kishujaa)
 * - Glassmorphism search card (Kadi ya utafutaji ya miwani)
 * - Responsive grid layout (Muundo wa gridi unaojibu)
 * - Animated statistics (Takwimu zenye mchoro)
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/hero-background.jpg';

/**
 * Hero Section Component
 * Kipengele cha sehemu ya kishujaa
 * 
 * This is the primary component that users see when they land on the homepage.
 * It combines search functionality with inspirational messaging and platform statistics.
 * 
 * Hiki ni kipengele kikuu ambacho watumiaji wanaona wanapofikia ukurasa wa kwanza.
 * Kinaunganisha utendakazi wa utafutaji na ujumbe wa kuhamasisha na takwimu za jukwaa.
 */
const HeroSection = () => {
  // Search form state management
  // Usimamizi wa hali ya fomu ya utafutaji
  const [searchLocation, setSearchLocation] = useState(''); // Location search input
  const [minPrice, setMinPrice] = useState('');           // Minimum price filter
  const [maxPrice, setMaxPrice] = useState('');           // Maximum price filter

  return (
    <div className="relative min-h-[100vh] flex items-center">
      {/* Hero Background Image - Picha ya nyuma ya kishujaa */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Dark overlay for text readability - Uwazi wa giza kwa kusoma vizuri */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Hero Content - Maudhui makuu ya kishujaa */}
        <div className="text-center mb-12">
          {/* Primary headline - Kichwa kikuu */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Pata Nyumba ya
            <span className="block text-primary">Ndoto Yako</span>
          </h1>
          
          {/* Supporting message - Ujumbe wa kusaidia */}
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
            Kutoka studio za kisasa hadi nyumba za familia - pata mahali pazuri pa kuishi Tanzania
          </p>
        </div>

        {/* Search Interface Card - Kadi ya kiolesura cha utafutaji */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="shadow-2xl border-0 overflow-hidden bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* Location Search Input - Ingizo la utafutaji wa eneo */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Unataka wapi?
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Dar es Salaam, Arusha, Mwanza..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-12 h-14 text-lg border-2 border-border focus:border-primary"
                    />
                  </div>
                </div>

                {/* Price Range Inputs - Maingizo ya kiwango cha bei */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Minimum Price - Bei ya chini */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Bei ya Chini (TZS)
                    </label>
                    <Input
                      type="number"
                      placeholder="30,000"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="h-14 text-lg border-2 border-border focus:border-primary"
                    />
                  </div>
                  {/* Maximum Price - Bei ya juu */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Bei ya Juu (TZS)
                    </label>
                    <Input
                      type="number"
                      placeholder="1,000,000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="h-14 text-lg border-2 border-border focus:border-primary"
                    />
                  </div>
                </div>

                {/* Search Button with Navigation - Kitufe cha utafutaji na uongozaji */}
                <div className="flex items-end">
                  <Link 
                    to={`/browse${searchLocation || minPrice || maxPrice ? '?' : ''}${searchLocation ? `location=${encodeURIComponent(searchLocation)}` : ''}${searchLocation && (minPrice || maxPrice) ? '&' : ''}${minPrice ? `minPrice=${minPrice}` : ''}${minPrice && maxPrice ? '&' : ''}${maxPrice ? `maxPrice=${maxPrice}` : ''}`}
                    className="w-full"
                  >
                    <Button size="lg" className="w-full h-14 text-lg bg-primary hover:bg-primary/90 shadow-lg">
                      <Search className="h-6 w-6 mr-3" />
                      Tafuta
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Statistics - Takwimu za jukwaa */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {/* Available Properties - Nyumba zinazopatikana */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-white/80">Nyumba zinapatikana</div>
          </div>
          
          {/* Major Cities Coverage - Miji mikuu */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-white/80">Miji mikuu</div>
          </div>
          
          {/* Happy Customers - Wateja wenye furaha */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-4xl font-bold text-white mb-2">1000+</div>
            <div className="text-white/80">Wateja wenye furaha</div>
          </div>
          
          {/* Customer Support - Msaada wa wateja */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/80">Msaada wa haraka</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
