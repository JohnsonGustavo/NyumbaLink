
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('location', searchQuery);
    if (priceRange) params.set('price', priceRange);
    navigate(`/browse?${params.toString()}`);
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-safari-100 via-safari-200 to-serengeti-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-serengeti-300/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-20 w-48 h-48 bg-kilimanjaro-400/20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main heading */}
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="block">Pata Nyumba</span>
            <span className="block text-primary">Yako Tanzania</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Find your perfect home in Tanzania. From Dar es Salaam to Arusha, discover amazing properties with Nyumba Link.
          </p>
        </div>

        {/* Search section */}
        <div className="animate-fade-in bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Mahali (mf. Dar es Salaam, Arusha...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-primary"
              />
            </div>
            
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-primary">
                <SelectValue placeholder="Bei Range (TZS)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-500000">Chini ya TZS 500,000</SelectItem>
                <SelectItem value="500000-1000000">TZS 500,000 - 1,000,000</SelectItem>
                <SelectItem value="1000000-2000000">TZS 1,000,000 - 2,000,000</SelectItem>
                <SelectItem value="2000000-5000000">TZS 2,000,000 - 5,000,000</SelectItem>
                <SelectItem value="5000000+">Zaidi ya TZS 5,000,000</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleSearch}
              className="h-12 bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              <Search className="h-5 w-5 mr-2" />
              Tafuta Nyumba
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600">
            <span>Maeneo makuu:</span>
            <button 
              onClick={() => setSearchQuery('Dar es Salaam')}
              className="text-primary hover:underline"
            >
              Dar es Salaam
            </button>
            <span>•</span>
            <button 
              onClick={() => setSearchQuery('Arusha')}
              className="text-primary hover:underline"
            >
              Arusha
            </button>
            <span>•</span>
            <button 
              onClick={() => setSearchQuery('Mwanza')}
              className="text-primary hover:underline"
            >
              Mwanza
            </button>
            <span>•</span>
            <button 
              onClick={() => setSearchQuery('Dodoma')}
              className="text-primary hover:underline"
            >
              Dodoma
            </button>
          </div>
        </div>

        {/* Stats section */}
        <div className="animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-gray-700">Nyumba Zinazopatikana</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-gray-700">Miji ya Tanzania</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-gray-700">Wateja Waloridhika</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
