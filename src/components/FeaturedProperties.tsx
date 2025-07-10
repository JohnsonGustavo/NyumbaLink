import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Wifi, Car, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      title: 'Nyumba ya Kisasa Masaki',
      location: 'Masaki, Dar es Salaam',
      price: 2500000,
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=400&fit=crop',
      amenities: ['WiFi', 'Parking', 'Kitchen'],
      featured: true
    },
    {
      id: 2,
      title: 'Apartment ya Kifahari Mikocheni',
      location: 'Mikocheni, Dar es Salaam',
      price: 1800000,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
      amenities: ['WiFi', 'Parking'],
      featured: true
    },
    {
      id: 3,
      title: 'Villa ya Familia Arusha',
      location: 'Arusha',
      price: 2200000,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&h=400&fit=crop',
      amenities: ['WiFi', 'Kitchen', 'Parking'],
      featured: true
    },
    {
      id: 4,
      title: 'Penthouse Kilimani',
      location: 'Kilimani, Dar es Salaam',
      price: 3500000,
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=400&fit=crop',
      amenities: ['WiFi', 'Parking', 'Kitchen'],
      featured: true
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi': return <Wifi className="h-3 w-3" />;
      case 'Parking': return <Car className="h-3 w-3" />;
      case 'Kitchen': return <Utensils className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nyumba za Maarufu
          </h2>
          <p className="text-xl text-muted-foreground">
            Nyumba zilizochaguliwa kwa ubora na huduma bora
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Link 
              key={property.id}
              to={`/property/${property.id}`}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {property.featured && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      Maarufu
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                    <span className="text-xs font-medium">{property.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                        <span className="mr-1">{getAmenityIcon(amenity)}</span>
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-foreground">
                        TSh {property.price.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-sm">/mwezi</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {property.reviews} maoni
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/browse">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
              Ona Nyumba Zaidi
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;