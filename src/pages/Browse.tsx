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
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || 'all');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [utilities, setUtilities] = useState<string[]>([]);
  const [nearbyServices, setNearbyServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sample properties data with affordable options starting from 30,000 TZS
  const allProperties = [
    {
      id: '31',
      title: 'Chumba cha Nafuu Manzese',
      price: 30000,
      location: 'Manzese, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'],
      utilities: { electricity: false, water: true },
      nearbyServices: ['market'],
      landlord: { name: 'Mama Rehema', phone: '+255687123456', email: 'rehema@example.com' }
    },
    {
      id: '32',
      title: 'Bedsitter ya Rahisi Buguruni',
      price: 45000,
      location: 'Buguruni, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: false },
      nearbyServices: ['market'],
      landlord: { name: 'Bwana Musa', phone: '+255698765432', email: 'musa@example.com' }
    },
    {
      id: '33',
      title: 'Single Room Tandale',
      price: 60000,
      location: 'Tandale, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'market'],
      landlord: { name: 'Dada Amina', phone: '+255756432198', email: 'amina@example.com' }
    },
    {
      id: '34',
      title: 'Chumba cha Rahisi Kimara',
      price: 80000,
      location: 'Kimara Stop, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'market'],
      landlord: { name: 'Mama Fatma', phone: '+255723456789', email: 'fatma@example.com' }
    },
    {
      id: '35',
      title: 'Bedsitter Mbezi Juu',
      price: 120000,
      location: 'Mbezi Juu, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital', 'market'],
      landlord: { name: 'Ndugu Hassan', phone: '+255689012345', email: 'hassan.b@example.com' }
    },
    {
      id: '1',
      title: 'Nyumba ya Kisasa Mikocheni',
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
      price: 600000,
      location: 'Sinza, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital', 'market'],
      landlord: { name: 'Bwana Peter', phone: '+255654321987', email: 'peter@example.com' }
    },
    {
      id: '6',
      title: 'Chumba cha Bedsitter Mwanza',
      price: 450000,
      location: 'Ilemela, Mwanza',
      images: ['https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop'],
      utilities: { electricity: false, water: true },
      nearbyServices: ['market', 'hospital'],
      landlord: { name: 'Dada Susan', phone: '+255712987654', email: 'susan@example.com' }
    },
    {
      id: '7',
      title: 'Villa ya Msimbazi',
      price: 1500000,
      location: 'Msimbazi, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital', 'market'],
      landlord: { name: 'Dr. Ahmed', phone: '+255713456789', email: 'ahmed@example.com' }
    },
    {
      id: '8',
      title: 'Nyumba ya Kifahari Mbezi',
      price: 950000,
      location: 'Mbezi Beach, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'market'],
      landlord: { name: 'Eng. Patricia', phone: '+255765432198', email: 'patricia@example.com' }
    },
    {
      id: '9',
      title: 'Fleti ya Kiongozi',
      price: 700000,
      location: 'Kinondoni, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['hospital', 'market'],
      landlord: { name: 'Mheshimiwa John', phone: '+255756789123', email: 'john.m@example.com' }
    },
    {
      id: '10',
      title: 'Nyumba ya Kijiji Dodoma',
      price: 500000,
      location: 'Kigoma, Dodoma',
      images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: false },
      nearbyServices: ['school'],
      landlord: { name: 'Mzee Robert', phone: '+255698765432', email: 'robert@example.com' }
    },
    {
      id: '11',
      title: 'Penthouse ya Mlimani',
      price: 2200000,
      location: 'Mlimani City, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital', 'market'],
      landlord: { name: 'CEO Michael', phone: '+255787654321', email: 'michael@example.com' }
    },
    {
      id: '12',
      title: 'Ghorofa ya Kimodern',
      price: 850000,
      location: 'Upanga, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['hospital', 'market'],
      landlord: { name: 'Dkt. Sarah', phone: '+255654987321', email: 'sarah@example.com' }
    },
    {
      id: '13',
      title: 'Nyumba ya Familia Moshi',
      price: 680000,
      location: 'Moshi Urban, Kilimanjaro',
      images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital'],
      landlord: { name: 'Mama Elizabeth', phone: '+255743210987', email: 'elizabeth@example.com' }
    },
    {
      id: '14',
      title: 'Bungalow la Bahari',
      price: 1800000,
      location: 'Msimbazi Bay, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['market'],
      landlord: { name: 'Captain James', phone: '+255712345987', email: 'james@example.com' }
    },
    {
      id: '15',
      title: 'Nyumba ya Kibinafsi Tabata',
      price: 520000,
      location: 'Tabata, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'market'],
      landlord: { name: 'Ndugu Joseph', phone: '+255776543210', email: 'joseph@example.com' }
    },
    {
      id: '16',
      title: 'Maisonette ya Magomeni',
      price: 1100000,
      location: 'Magomeni, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital', 'market'],
      landlord: { name: 'Prof. Daniel', phone: '+255798765432', email: 'daniel@example.com' }
    },
    {
      id: '17',
      title: 'Flat ya Kisasa Ubungo',
      price: 750000,
      location: 'Ubungo, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['hospital', 'market'],
      landlord: { name: 'Arch. Maria', phone: '+255723456789', email: 'maria@example.com' }
    },
    {
      id: '18',
      title: 'Nyumba ya Bustani Tanga',
      price: 890000,
      location: 'Tanga Urban, Tanga',
      images: ['https://images.unsplash.com/photo-1502005229762-cf1b2da2db52?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital'],
      landlord: { name: 'Bi. Fatuma', phone: '+255687543210', email: 'fatuma@example.com' }
    },
    {
      id: '19',
      title: 'Duplex ya Kariakoo',
      price: 650000,
      location: 'Kariakoo, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: false },
      nearbyServices: ['market'],
      landlord: { name: 'Bwana Ali', phone: '+255654123789', email: 'ali@example.com' }
    },
    {
      id: '20',
      title: 'Townhouse ya Oysterbay',
      price: 2800000,
      location: 'Oysterbay, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital', 'market'],
      landlord: { name: 'Hon. Grace', phone: '+255789123456', email: 'grace.h@example.com' }
    },
    {
      id: '21',
      title: 'Nyumba ya Uongozi Iringa',
      price: 920000,
      location: 'Iringa Urban, Iringa',
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital'],
      landlord: { name: 'Judge William', phone: '+255712987654', email: 'william@example.com' }
    },
    {
      id: '22',
      title: 'Condo ya Mikindani',
      price: 580000,
      location: 'Mikindani, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'market'],
      landlord: { name: 'Mama Joyce', phone: '+255743567890', email: 'joyce@example.com' }
    },
    {
      id: '23',
      title: 'Villa ya Kijiji Morogoro',
      price: 1350000,
      location: 'Morogoro Urban, Morogoro',
      images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital', 'market'],
      landlord: { name: 'Prof. Hassan', phone: '+255765890123', email: 'hassan.p@example.com' }
    },
    {
      id: '24',
      title: 'Bedsitter ya Kimara',
      price: 380000,
      location: 'Kimara, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: false },
      nearbyServices: ['market'],
      landlord: { name: 'Kaka Juma', phone: '+255698234567', email: 'juma@example.com' }
    },
    {
      id: '25',
      title: 'Apartment ya VIP Masaki',
      price: 3200000,
      location: 'Masaki, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital', 'market'],
      landlord: { name: 'Ambassador John', phone: '+255787123456', email: 'john.amb@example.com' }
    },
    {
      id: '26',
      title: 'Nyumba ya Makazi Mbeya',
      price: 720000,
      location: 'Mbeya Urban, Mbeya',
      images: ['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital'],
      landlord: { name: 'Dr. Joyce', phone: '+255756234789', email: 'joyce.dr@example.com' }
    },
    {
      id: '27',
      title: 'Flat ya Kisimani Mwanza',
      price: 480000,
      location: 'Kisimani, Mwanza',
      images: ['https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=400&h=300&fit=crop'],
      utilities: { electricity: false, water: true },
      nearbyServices: ['market', 'hospital'],
      landlord: { name: 'Fisherman Paul', phone: '+255689456123', email: 'paul@example.com' }
    },
    {
      id: '28',
      title: 'Executive House Arusha',
      price: 1650000,
      location: 'Arusha Urban, Arusha',
      images: ['https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital', 'market'],
      landlord: { name: 'CEO Margaret', phone: '+255723789456', email: 'margaret@example.com' }
    },
    {
      id: '29',
      title: 'Nyumba ya Familia Bukoba',
      price: 620000,
      location: 'Bukoba Urban, Kagera',
      images: ['https://images.unsplash.com/photo-1600566752229-450c4ff7a2c6?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'market'],
      landlord: { name: 'Mama Anna', phone: '+255654789123', email: 'anna@example.com' }
    },
    {
      id: '30',
      title: 'Loft ya Kisasa Songea',
      price: 550000,
      location: 'Songea Urban, Ruvuma',
      images: ['https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: false },
      nearbyServices: ['school', 'hospital'],
      landlord: { name: 'Teacher Moses', phone: '+255667890234', email: 'moses@example.com' }
    }
  ];

  // Filter properties based on search criteria
  const filteredProperties = allProperties.filter(property => {
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
    if (minPrice && parseInt(minPrice) > property.price) {
      return false;
    }
    if (maxPrice && parseInt(maxPrice) < property.price) {
      return false;
    }

    // Handle predefined price range
    if (priceRange && priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      const minPriceRange = parseInt(min);
      const maxPriceRange = max ? parseInt(max) : Infinity;
      
      if (property.price < minPriceRange || property.price > maxPriceRange) {
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
    setPriceRange('all');
    setMinPrice('');
    setMaxPrice('');
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
