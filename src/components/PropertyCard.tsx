
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Zap, Droplets, School, Building2, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  utilities: {
    electricity: boolean;
    water: boolean;
  };
  nearbyServices: string[];
  landlord: {
    name: string;
    phone: string;
    email: string;
  };
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  description,
  price,
  location,
  images,
  utilities,
  nearbyServices,
  landlord,
  isFavorited = false,
  onToggleFavorite
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const serviceIcons = {
    school: School,
    hospital: Building2,
    market: ShoppingCart,
    default: MapPin
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        {/* Image carousel */}
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={images[currentImageIndex] || `https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop`}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Image indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isFavorited ? 'text-red-500' : 'text-gray-600'
          } hover:text-red-500 bg-white/80 hover:bg-white`}
          onClick={handleToggleFavorite}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
        </Button>

        {/* Price badge */}
        <div className="absolute top-2 left-2">
          <Badge className="bg-primary text-white font-bold">
            TZS {price.toLocaleString()}/mwezi
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title and location */}
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2">
            {description}
          </p>

          {/* Utilities */}
          <div className="flex items-center space-x-3">
            {utilities.electricity && (
              <div className="flex items-center text-green-600 text-xs">
                <Zap className="h-3 w-3 mr-1" />
                <span>Umeme</span>
              </div>
            )}
            {utilities.water && (
              <div className="flex items-center text-blue-600 text-xs">
                <Droplets className="h-3 w-3 mr-1" />
                <span>Maji</span>
              </div>
            )}
          </div>

          {/* Nearby services */}
          {nearbyServices.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {nearbyServices.slice(0, 3).map((service) => {
                const IconComponent = serviceIcons[service as keyof typeof serviceIcons] || serviceIcons.default;
                return (
                  <Badge key={service} variant="secondary" className="text-xs">
                    <IconComponent className="h-3 w-3 mr-1" />
                    {service}
                  </Badge>
                );
              })}
              {nearbyServices.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{nearbyServices.length - 3} zaidi
                </Badge>
              )}
            </div>
          )}

          {/* View details button */}
          <Link to={`/property/${id}`} className="block w-full">
            <Button variant="outline" className="w-full mt-2 hover:bg-primary hover:text-white transition-colors">
              Angalia Zaidi
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
