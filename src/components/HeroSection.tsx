
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/hero-background.jpg';

const HeroSection = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  return (
    <div className="relative min-h-[100vh] flex items-center">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Pata Nyumba ya
            <span className="block text-primary">Ndoto Yako</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
            Kutoka studio za kisasa hadi nyumba za familia - pata mahali pazuri pa kuishi Tanzania
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="shadow-2xl border-0 overflow-hidden bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Location */}
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

                {/* Price Range */}
                <div className="grid grid-cols-2 gap-2">
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

                {/* Search Button */}
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-white/80">Nyumba zinapatikana</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-white/80">Miji mikuu</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-4xl font-bold text-white mb-2">1000+</div>
            <div className="text-white/80">Wateja wenye furaha</div>
          </div>
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
