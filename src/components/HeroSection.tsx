
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
 * Hero Section Component - Enhanced Version
 * Kipengele cha sehemu ya kishujaa - Toleo la Kuboresha
 * 
 * This is the primary component that users see when they land on the homepage.
 * It combines search functionality with inspirational messaging and platform statistics.
 * Enhanced with better design, animations, and company mission reflection.
 * 
 * Hiki ni kipengele kikuu ambacho watumiaji wanaona wanapofikia ukurasa wa kwanza.
 * Kinaunganisha utendakazi wa utafutaji na ujumbe wa kuhamasisha na takwimu za jukwaa.
 * Kimeboreshwa na muundo bora, michoro, na kuonyesha dhamira ya kampuni.
 */
const HeroSection = () => {
  // Search form state management
  // Usimamizi wa hali ya fomu ya utafutaji
  const [searchLocation, setSearchLocation] = useState(''); // Location search input
  const [minPrice, setMinPrice] = useState('');           // Minimum price filter
  const [maxPrice, setMaxPrice] = useState('');           // Maximum price filter

  return (
    <div className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Enhanced Hero Background with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Multi-layer overlay for better visual hierarchy */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-safari-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Company Mission Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-white/90 font-medium">Tanzania's #1 Property Platform</span>
          </div>
        </div>

        {/* Enhanced Main Hero Content */}
        <div className="text-center mb-16">
          {/* Enhanced primary headline with animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in">
            Karibu Nyumbani
            <span className="block bg-gradient-to-r from-primary via-safari-400 to-primary bg-clip-text text-transparent animate-pulse">
              Nyumba Link
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-4 text-white/90">
              Unganisha Ndoto na Nyumba
            </span>
          </h1>
          
          {/* Enhanced supporting message with value propositions */}
          <div className="max-w-4xl mx-auto space-y-4 mb-12">
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed">
              Kutoka studio za kisasa Dar es Salaam hadi villa za baharini Zanzibar
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Tumekuunganisha na mali bora zaidi Tanzania - haraka, salama, na kwa bei nafuu
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="text-sm font-medium">Makazi yaliyohakikiwa</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-3 h-3 bg-blue-400 rounded-full" />
              <span className="text-sm font-medium">Msaada wa 24/7</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-sm font-medium">Miamala salama</span>
            </div>
          </div>
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

        {/* Enhanced Platform Statistics - Takwimu za jukwaa zilizobora */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {/* Verified Properties - Mali zilizohakikiwa */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-3 group-hover:text-primary transition-colors">2,500+</div>
            <div className="text-white/90 font-medium">Mali zilizohakikiwa</div>
            <div className="text-white/60 text-sm mt-1">Kila mji mkuu</div>
          </div>
          
          {/* Regional Coverage - Mkoa uliofunikwa */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-3 group-hover:text-safari-400 transition-colors">26</div>
            <div className="text-white/90 font-medium">Mikoa yote</div>
            <div className="text-white/60 text-sm mt-1">Tanzania nzima</div>
          </div>
          
          {/* Successful Connections - Miunganiko mafanikio */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-3 group-hover:text-kilimanjaro-400 transition-colors">5,000+</div>
            <div className="text-white/90 font-medium">Familia zilizohamia</div>
            <div className="text-white/60 text-sm mt-1">Nyumba mpya</div>
          </div>
          
          {/* Average Response Time - Muda wa majibu */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-3 group-hover:text-primary transition-colors">&lt;2min</div>
            <div className="text-white/90 font-medium">Muda wa majibu</div>
            <div className="text-white/60 text-sm mt-1">Msaada wa haraka</div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center mt-16 pt-8 border-t border-white/20">
          <p className="text-white/80 text-lg mb-6">
            Jisajili leo na upate taarifa za nyumba mpya kila siku
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Kuhusu Sisi
            </Button>
            <Link to="/browse">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg">
                Anza Kutafuta Sasa
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
