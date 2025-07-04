
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, SlidersHorizontal, X } from 'lucide-react';
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
    // Location filter
    if (searchQuery && !property.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Price range filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      const minPrice = parseInt(min);
      const maxPrice = max ? parseInt(max) : Infinity;
      
      if (property.price < minPrice || property.price > maxPrice) {
        return false;
      }
    }

    // Utilities filter
    if (utilities.length > 0) {
      if (utilities.includes('electricity') && !property.utilities.electricity) return false;
      if (utilities.includes('water') && !property.utilities.water) return false;
    }

    // Nearby services filter
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tazama Nyumba za Kupanga
          </h1>
          <p className="text-gray-600">
            {sortedProperties.length} nyumba zinapatikana
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              {/* Main search row */}
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Tafuta kwa jina la mji au eneo..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Bei (TZS)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Bei yoyote</SelectItem>
                    <SelectItem value="0-500000">Chini ya 500,000</SelectItem>
                    <SelectItem value="500000-1000000">500,000 - 1,000,000</SelectItem>
                    <SelectItem value="1000000-2000000">1,000,000 - 2,000,000</SelectItem>
                    <SelectItem value="2000000-5000000">2,000,000 - 5,000,000</SelectItem>
                    <SelectItem value="5000000+">Zaidi ya 5,000,000</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Panga kwa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mpya zaidi</SelectItem>
                    <SelectItem value="price-low">Bei ya chini kwanza</SelectItem>
                    <SelectItem value="price-high">Bei ya juu kwanza</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:w-auto"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Advanced filters */}
              {showFilters && (
                <div className="border-t pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Utilities */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Huduma za Msingi
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={utilities.includes('electricity')}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setUtilities([...utilities, 'electricity']);
                              } else {
                                setUtilities(utilities.filter(u => u !== 'electricity'));
                              }
                            }}
                            className="mr-2"
                          />
                          Umeme
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={utilities.includes('water')}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setUtilities([...utilities, 'water']);
                              } else {
                                setUtilities(utilities.filter(u => u !== 'water'));
                              }
                            }}
                            className="mr-2"
                          />
                          Maji
                        </label>
                      </div>
                    </div>

                    {/* Nearby services */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Huduma za Karibu
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={nearbyServices.includes('school')}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNearbyServices([...nearbyServices, 'school']);
                              } else {
                                setNearbyServices(nearbyServices.filter(s => s !== 'school'));
                              }
                            }}
                            className="mr-2"
                          />
                          Shule
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={nearbyServices.includes('hospital')}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNearbyServices([...nearbyServices, 'hospital']);
                              } else {
                                setNearbyServices(nearbyServices.filter(s => s !== 'hospital'));
                              }
                            }}
                            className="mr-2"
                          />
                          Hospitali
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={nearbyServices.includes('market')}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNearbyServices([...nearbyServices, 'market']);
                              } else {
                                setNearbyServices(nearbyServices.filter(s => s !== 'market'));
                              }
                            }}
                            className="mr-2"
                          />
                          Soko
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Clear filters */}
                  <div className="flex justify-end">
                    <Button variant="ghost" onClick={clearAllFilters}>
                      <X className="h-4 w-4 mr-2" />
                      Futa Filters Zote
                    </Button>
                  </div>
                </div>
              )}

              {/* Active filters */}
              {(searchQuery || priceRange || utilities.length > 0 || nearbyServices.length > 0) && (
                <div className="border-t pt-4 mt-4">
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <Badge variant="secondary">
                        Mahali: {searchQuery}
                        <button
                          onClick={() => setSearchQuery('')}
                          className="ml-2 text-xs"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    {priceRange && (
                      <Badge variant="secondary">
                        Bei: TZS {priceRange}
                        <button
                          onClick={() => setPriceRange('')}
                          className="ml-2 text-xs"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    {utilities.map(utility => (
                      <Badge key={utility} variant="secondary">
                        {utility === 'electricity' ? 'Umeme' : 'Maji'}
                        <button
                          onClick={() => setUtilities(utilities.filter(u => u !== utility))}
                          className="ml-2 text-xs"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {nearbyServices.map(service => (
                      <Badge key={service} variant="secondary">
                        {service === 'school' ? 'Shule' : service === 'hospital' ? 'Hospitali' : 'Soko'}
                        <button
                          onClick={() => setNearbyServices(nearbyServices.filter(s => s !== service))}
                          className="ml-2 text-xs"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Properties grid */}
        {sortedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                isFavorited={favoriteIds.includes(property.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Hakuna nyumba zilizopatikana
            </h3>
            <p className="text-gray-600 mb-4">
              Jaribu kubadilisha vigezo vya utafutaji au futa baadhi ya filters.
            </p>
            <Button onClick={clearAllFilters} variant="outline">
              Futa Filters Zote
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
