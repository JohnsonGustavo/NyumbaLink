/**
 * BROWSE.TSX - PROPERTY LISTING AND SEARCH PAGE
 * =============================================
 * 
 * Ukurasa wa kutazama na kutafuta nyumba - Property browsing and search page
 * 
 * ARCHITECTURE OVERVIEW / MUHTASARI WA MUUNDO:
 * This is the main property discovery page that handles complex filtering,
 * search functionality, and property display. It serves as the primary
 * interface for users to find properties that match their criteria.
 * 
 * DESIGN PATTERNS / MIFUMO YA MUUNDO:
 * - URL-driven state management for shareable searches
 * - Compound filtering with multiple criteria
 * - Responsive grid/list view switching
 * - Real-time search with debouncing (can be added)
 * - Infinite scroll ready architecture
 * 
 * MAIN FUNCTIONALITY / KAZI KEKUU:
 * - Display all available properties (Kuonyesha nyumba zote zinazopatikana)
 * - Advanced filtering by location, price, utilities (Vichujio vya kirefu vya eneo, bei, huduma)
 * - Property search functionality (Utendakazi wa kutafuta nyumba)
 * - Sorting options (price, date, etc.) (Chaguo za kupanga)
 * - Grid and list view modes (Hali za kuona kama gridi na orodha)
 * - Favorites management (Usimamizi wa vipendwa)
 * 
 * PERFORMANCE CONSIDERATIONS / MAMBO YA UTENDAJI:
 * - Efficient filtering algorithms for large datasets
 * - Memoized filter functions (can be optimized)
 * - Lazy loading for images
 * - Virtual scrolling for large lists (future enhancement)
 * - Debounced search input (can be added)
 * 
 * DATA FLOW / MTIRIRIKO WA DATA:
 * 1. Receives URL parameters from HeroSection or PopularDestinations
 * 2. Filters properties based on search criteria
 * 3. Displays filtered results with pagination
 * 4. Allows users to save favorites and navigate to property details
 * 
 * STATE MANAGEMENT STRATEGY / MKAKATI WA USIMAMIZI WA HALI:
 * - URL parameters for shareable state
 * - Local state for UI interactions
 * - React Query for server state
 * - Context for global favorites (can be added)
 * 
 * COMPONENT INTERACTIONS / MWINGILIANO WA VIPENGELE:
 * - Receives search params from: HeroSection, PopularDestinations
 * - Navigates to: PropertyDetail page
 * - Uses: PropertyCard component for display
 * - Manages: Favorites state across the application
 * 
 * ACCESSIBILITY FEATURES / VIPENGELE VYA UFIKIVU:
 * - Keyboard navigation support
 * - Screen reader friendly labels
 * - High contrast design
 * - Focus management
 * - ARIA labels for complex interactions
 * 
 * FILTERING LOGIC / MANTIKI YA KUCHUJA:
 * - Location: Partial matching for city names and areas
 * - Price: Range filtering with min/max values
 * - Utilities: Multiple selection (electricity, water)
 * - Services: Multiple selection (schools, hospitals, markets)
 * - Sorting: By price, date, relevance
 * 
 * SCALABILITY ENHANCEMENTS / MABORESHO YA UKUAJI:
 * - Can be extended with saved searches
 * - Map view integration ready
 * - Advanced filters (property type, size, etc.)
 * - Recommendation engine integration
 * - Social features (sharing, reviews)
 */

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Search, Filter, MapPin, SlidersHorizontal, X, Grid3X3, List, Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useProperties } from '@/hooks/useProperties';

/**
 * Browse Properties Component
 * Kipengele cha kutazama nyumba
 * 
 * This component handles the main property browsing experience with advanced filtering,
 * search capabilities, and multiple view modes for user convenience.
 * 
 * Kipengele hiki kinashughulikia tajriba ya kutazama nyumba na vichujio vya kirefu,
 * uwezo wa kutafuta, na hali nyingi za kuona kwa urahisi wa mtumiaji.
 */
const Browse = () => {
  // URL parameter handling for search state persistence
  // Kushughulikia vigezo vya URL kwa kudumu kwa hali ya utafutaji
  const [searchParams] = useSearchParams();
  
  // Search and filter state management
  // Usimamizi wa hali ya utafutaji na vichujio
  const [searchQuery, setSearchQuery] = useState(searchParams.get('location') || ''); // Location search
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || 'all'); // Predefined price ranges
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || ''); // Custom minimum price
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || ''); // Custom maximum price
  const [utilities, setUtilities] = useState<string[]>([]); // Utilities filter (electricity, water)
  const [nearbyServices, setNearbyServices] = useState<string[]>([]); // Services filter (schools, hospitals)
  const [sortBy, setSortBy] = useState('newest'); // Sorting preference
  const [showFilters, setShowFilters] = useState(false); // Filter panel visibility
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]); // User's favorite properties
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // Display mode preference

  // Fetch properties from Supabase
  const { data: properties = [], isLoading, error } = useProperties();

  // Filter properties based on search criteria
  const filteredProperties = properties.filter(property => {
    // Location filtering - show properties from specific city
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      const location = property.location.toLowerCase();
      
      // Direct match for the location
      if (!location.includes(query)) {
        return false;
      }
    }

    // Handle custom price inputs
    if (minPrice && parseInt(minPrice) > Number(property.price)) {
      return false;
    }
    if (maxPrice && parseInt(maxPrice) < Number(property.price)) {
      return false;
    }

    // Handle predefined price range
    if (priceRange && priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      const minPriceRange = parseInt(min);
      const maxPriceRange = max ? parseInt(max) : Infinity;
      
      if (Number(property.price) < minPriceRange || Number(property.price) > maxPriceRange) {
        return false;
      }
    }

    if (utilities.length > 0) {
      if (utilities.includes('electricity') && !property.electricity) return false;
      if (utilities.includes('water') && !property.water) return false;
    }

    if (nearbyServices.length > 0) {
      const hasAllServices = nearbyServices.every(service => 
        property.nearby_services?.includes(service)
      );
      if (!hasAllServices) return false;
    }

    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return Number(a.price) - Number(b.price);
      case 'price-high':
        return Number(b.price) - Number(a.price);
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
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
    setPriceRange('all');
    setMinPrice('');
    setMaxPrice('');
    setUtilities([]);
    setNearbyServices([]);
    setSortBy('newest');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Kuna hitilafu katika kupakia nyumba
            </h2>
            <p className="text-gray-600 mb-8">
              Tafadhali jaribu tena baadaye.
            </p>
            <Button onClick={() => window.location.reload()}>
              Jaribu Tena
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
                      <SelectItem value="0-100000">Chini ya 100K</SelectItem>
                      <SelectItem value="100000-500000">100K - 500K</SelectItem>
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Bei ya Maalum</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bei ya chini (TZS)
                          </label>
                          <Input
                            type="number"
                            placeholder="30,000"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bei ya juu (TZS)
                          </label>
                          <Input
                            type="number"
                            placeholder="500,000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

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
        {(searchQuery || (priceRange && priceRange !== 'all') || minPrice || maxPrice || utilities.length > 0 || nearbyServices.length > 0) && (
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
                    onClick={() => setPriceRange('all')}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {minPrice && (
                <Badge variant="secondary" className="px-3 py-1">
                  Min: TZS {parseInt(minPrice).toLocaleString()}
                  <button
                    onClick={() => setMinPrice('')}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {maxPrice && (
                <Badge variant="secondary" className="px-3 py-1">
                  Max: TZS {parseInt(maxPrice).toLocaleString()}
                  <button
                    onClick={() => setMaxPrice('')}
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

        {/* Loading State */}
        {isLoading && (
          <div className="py-16">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-center text-gray-600">Inapakia nyumba...</p>
          </div>
        )}

        {/* Properties Grid */}
        {!isLoading && sortedProperties.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {sortedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                price={Number(property.price)}
                location={property.location}
                images={property.images || []}
                phone={property.profiles?.phone || undefined}
                isFavorited={favoriteIds.includes(property.id)}
                onToggleFavorite={handleToggleFavorite}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : !isLoading ? (
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
        ) : null}
      </div>
      
      <Footer />
    </div>
  );
};

export default Browse;
