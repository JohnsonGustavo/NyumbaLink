import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, SlidersHorizontal, X, Grid3X3, List } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('location') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || '');
  const [utilities, setUtilities] = useState<string[]>([]);
  const [nearbyServices, setNearbyServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sample properties data
  const allProperties = [
    {
      id: '1',
      title: 'Nyumba ya Kisasa Mikocheni',
      description: 'Nyumba nzuri ya vyumba 3 na jiko la kisasa. Ina bustani ndogo na nafasi ya gari. Mazingira mazuri na usalama wa juu.',
      price: 800000,
      location: 'Mikocheni, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital', 'market'],
      landlord: { name: 'Mwalimu John', phone: '+255712345678', email: 'john@example.com' }
    },
    {
      id: '2',
      title: 'Apartmenti ya Ufukweni',
      description: 'Chumba kimoja na jiko. Karibu na barabara kuu na maktaba ya umma. Bei nafuu kwa wanafunzi.',
      price: 400000,
      location: 'Mwananyamala, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: false },
      nearbyServices: ['school', 'market'],
      landlord: { name: 'Bi. Mary', phone: '+255756789012', email: 'mary@example.com' }
    },
    {
      id: '3',
      title: 'Nyumba ya Familia Arusha',
      description: 'Nyumba kubwa ya vyumba 4 na bustani. Mazingira mazuri na hewa safi. Inafaa kwa familia kubwa.',
      price: 1200000,
      location: 'Njiro, Arusha',
      images: ['https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital'],
      landlord: { name: 'Mzee Hassan', phone: '+255678901234', email: 'hassan@example.com' }
    },
    {
      id: '4',
      title: 'Studio ya Mtaa wa Kijitonyama',
      description: 'Chumba kimoja chenye kila kitu. Karibu na stendi za daladala na maduka.',
      price: 350000,
      location: 'Kijitonyama, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['market'],
      landlord: { name: 'Mama Grace', phone: '+255687654321', email: 'grace@example.com' }
    },
    {
      id: '5',
      title: 'Nyumba ya Kielembe',
      description: 'Vyumba 2 na sebule kubwa. Ina bomba la maji na umeme wa kudumu.',
      price: 600000,
      location: 'Sinza, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital', 'market'],
      landlord: { name: 'Bwana Peter', phone: '+255654321987', email: 'peter@example.com' }
    },
    {
      id: '6',
      title: 'Chumba cha Bedsitter Mwanza',
      description: 'Bedsitter lenye jiko na choo. Karibu na ziwa Victoria na mazingira mazuri.',
      price: 450000,
      location: 'Ilemela, Mwanza',
      images: ['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop'],
      utilities: { electricity: false, water: true },
      nearbyServices: ['market', 'hospital'],
      landlord: { name: 'Dada Susan', phone: '+255712987654', email: 'susan@example.com' }
    }
  ];

  // Filter properties based on search criteria
  const filteredProperties = allProperties.filter(property => {
    if (searchQuery && !property.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      const minPrice = parseInt(min);
      const maxPrice = max ? parseInt(max) : Infinity;
      
      if (property.price < minPrice || property.price > maxPrice) {
        return false;
      }
    }

    if (utilities.length > 0) {
      if (utilities.includes('electricity') && !property.utilities.electricity) return false;
      if (utilities.includes('water') && !property.utilities.water) return false;
    }

    if (nearbyServices.length > 0) {
      const hasAllServices = nearbyServices.every(service => 
        property.nearbyServices.includes(service)
      );
      if (!hasAllServices) return false;
    }

    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
      default:
        return 0;
    }
  });

  const handleToggleFavorite = (propertyId: string) => {
    setFavoriteIds(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setPriceRange('');
    setUtilities([]);
    setNearbyServices([]);
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-primary/5 to-serengeti-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Pata Nyumba Yako ya Kupenda
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Nyumba {sortedProperties.length} zinapatikana kwa ajili yako
            </p>
          </div>

          {/* Main Search Bar */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Mji au eneo la kupenda..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 text-lg border-0 focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="w-48 h-14 border-0">
                      <SelectValue placeholder="Bei (TZS)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Bei yoyote</SelectItem>
                      <SelectItem value="0-500000">Chini ya 500K</SelectItem>
                      <SelectItem value="500000-1000000">500K - 1M</SelectItem>
                      <SelectItem value="1000000-2000000">1M - 2M</SelectItem>
                      <SelectItem value="2000000+">Zaidi ya 2M</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-14 px-6 border-2"
                  >
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    Filters
                  </Button>

                  <Button className="h-14 px-8 bg-primary hover:bg-primary/90">
                    <Search className="h-5 w-5 mr-2" />
                    Tafuta
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="border-t mt-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Huduma za Msingi</h4>
                      <div className="space-y-3">
                        {['electricity', 'water'].map((utility) => (
                          <label key={utility} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={utilities.includes(utility)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setUtilities([...utilities, utility]);
                                } else {
                                  setUtilities(utilities.filter(u => u !== utility));
                                }
                              }}
                              className="mr-3 w-4 h-4 text-primary"
                            />
                            <span className="text-gray-700">
                              {utility === 'electricity' ? 'Umeme' : 'Maji'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Huduma za Karibu</h4>
                      <div className="space-y-3">
                        {['school', 'hospital', 'market'].map((service) => (
                          <label key={service} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={nearbyServices.includes(service)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNearbyServices([...nearbyServices, service]);
                                } else {
                                  setNearbyServices(nearbyServices.filter(s => s !== service));
                                }
                              }}
                              className="mr-3 w-4 h-4 text-primary"
                            />
                            <span className="text-gray-700">
                              {service === 'school' ? 'Shule' : service === 'hospital' ? 'Hospitali' : 'Soko'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Panga Kwa</h4>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Mpya zaidi</SelectItem>
                          <SelectItem value="price-low">Bei ya chini</SelectItem>
                          <SelectItem value="price-high">Bei ya juu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <Button variant="ghost" onClick={clearAllFilters} className="text-gray-600">
                      <X className="h-4 w-4 mr-2" />
                      Futa Filters Zote
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {sortedProperties.length} nyumba zinapatikana
            </h2>
            {searchQuery && (
              <p className="text-gray-600 mt-1">katika "{searchQuery}"</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || (priceRange && priceRange !== 'all') || utilities.length > 0 || nearbyServices.length > 0) && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="px-3 py-1">
                  {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {priceRange && priceRange !== 'all' && (
                <Badge variant="secondary" className="px-3 py-1">
                  TZS {priceRange}
                  <button
                    onClick={() => setPriceRange('')}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {utilities.map(utility => (
                <Badge key={utility} variant="secondary" className="px-3 py-1">
                  {utility === 'electricity' ? 'Umeme' : 'Maji'}
                  <button
                    onClick={() => setUtilities(utilities.filter(u => u !== utility))}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {nearbyServices.map(service => (
                <Badge key={service} variant="secondary" className="px-3 py-1">
                  {service === 'school' ? 'Shule' : service === 'hospital' ? 'Hospitali' : 'Soko'}
                  <button
                    onClick={() => setNearbyServices(nearbyServices.filter(s => s !== service))}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Properties Grid */}
        {sortedProperties.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {sortedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                isFavorited={favoriteIds.includes(property.id)}
                onToggleFavorite={handleToggleFavorite}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Hakuna nyumba zilizopatikana
              </h3>
              <p className="text-gray-600 mb-8">
                Jaribu kubadilisha vigezo vya utafutaji au futa baadhi ya filters.
              </p>
              <Button onClick={clearAllFilters} size="lg">
                Futa Filters Zote
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Browse;
