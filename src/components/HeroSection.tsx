
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [searchLocation, setSearchLocation] = useState('');

  return (
    <div className="relative min-h-[85vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-serengeti-50 to-kilimanjaro-50" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Pata Nyumba ya
            <span className="block text-primary">Ndoto Yako</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Kutoka studio za kisasa hadi nyumba za familia - pata mahali pazuri pa kuishi Tanzania
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Location */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Unataka wapi?
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Dar es Salaam, Arusha, Mwanza..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bei (TZS)
                  </label>
                  <select className="w-full h-14 px-4 border-2 border-gray-200 rounded-md focus:border-primary focus:outline-none text-lg">
                    <option value="">Chagua bei</option>
                    <option value="0-500000">Chini ya 500K</option>
                    <option value="500000-1000000">500K - 1M</option>
                    <option value="1000000-2000000">1M - 2M</option>
                    <option value="2000000+">Zaidi ya 2M</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <Link 
                    to={`/browse${searchLocation ? `?location=${encodeURIComponent(searchLocation)}` : ''}`}
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
          <div>
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-gray-600">Nyumba zinapatikana</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-gray-600">Miji mikuu</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-gray-600">Wateja wenye furaha</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-600">Msaada wa haraka</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
