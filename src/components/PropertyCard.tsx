
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Zap, Droplets, School, Building2, ShoppingCart, Star } from 'lucide-react';
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
  viewMode?: 'grid' | 'list';
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
  onToggleFavorite,
  viewMode = 'grid'
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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

  if (viewMode === 'list') {
    return (
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
        <Link to={`/property/${id}`} className="block">
          <div className="flex">
            {/* Image */}
            <div className="w-80 h-60 flex-shrink-0 relative overflow-hidden">
              <img
                src={images[0] || `https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop`}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onLoad={() => setIsImageLoaded(true)}
              />
              
              {/* Favorite button */}
              <Button
                variant="ghost"
                size="sm"
                className={`absolute top-3 right-3 p-2 rounded-full ${
                  isFavorited ? 'text-red-500' : 'text-white'
                } hover:text-red-500 bg-black/20 hover:bg-white/90`}
                onClick={handleToggleFavorite}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>

              {/* Price overlay */}
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-white text-gray-900 font-bold text-base px-3 py-1 shadow-sm">
                  TZS {price.toLocaleString()}/mwezi
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-xl text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                    {title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{location}</span>
                  </div>
                </div>

                <p className="text-gray-600 line-clamp-2">
                  {description}
                </p>

                {/* Utilities and services */}
                <div className="flex items-center gap-4">
                  {utilities.electricity && (
                    <div className="flex items-center text-green-600 text-sm">
                      <Zap className="h-4 w-4 mr-1" />
                      <span>Umeme</span>
                    </div>
                  )}
                  {utilities.water && (
                    <div className="flex items-center text-blue-600 text-sm">
                      <Droplets className="h-4 w-4 mr-1" />
                      <span>Maji</span>
                    </div>
                  )}
                </div>

                {nearbyServices.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {nearbyServices.slice(0, 3).map((service) => {
                      const IconComponent = serviceIcons[service as keyof typeof serviceIcons] || serviceIcons.default;
                      return (
                        <Badge key={service} variant="outline" className="text-xs">
                          <IconComponent className="h-3 w-3 mr-1" />
                          {service === 'school' ? 'Shule' : service === 'hospital' ? 'Hospitali' : 'Soko'}
                        </Badge>
                      );
                    })}
                    {nearbyServices.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{nearbyServices.length - 3} zaidi
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-sm">
      <Link to={`/property/${id}`} className="block">
        <div className="relative">
          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden relative">
            <img
              src={images[currentImageIndex] || `https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop`}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onLoad={() => setIsImageLoaded(true)}
            />
            
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
          </div>

          {/* Image indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
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
            className={`absolute top-3 right-3 p-2 rounded-full ${
              isFavorited ? 'text-red-500' : 'text-white'
            } hover:text-red-500 bg-black/20 hover:bg-white/90 transition-all`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <CardContent className="p-5">
          <div className="space-y-3">
            {/* Title and location */}
            <div>
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="line-clamp-1">{location}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-900">
                TZS {price.toLocaleString()}
              </span>
              <span className="text-gray-500 ml-1">/mwezi</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm line-clamp-2">
              {description}
            </p>

            {/* Utilities */}
            <div className="flex items-center space-x-4">
              {utilities.electricity && (
                <div className="flex items-center text-green-600 text-sm">
                  <Zap className="h-4 w-4 mr-1" />
                  <span>Umeme</span>
                </div>
              )}
              {utilities.water && (
                <div className="flex items-center text-blue-600 text-sm">
                  <Droplets className="h-4 w-4 mr-1" />
                  <span>Maji</span>
                </div>
              )}
            </div>

            {/* Nearby services */}
            {nearbyServices.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {nearbyServices.slice(0, 2).map((service) => {
                  const IconComponent = serviceIcons[service as keyof typeof serviceIcons] || serviceIcons.default;
                  return (
                    <Badge key={service} variant="outline" className="text-xs">
                      <IconComponent className="h-3 w-3 mr-1" />
                      {service === 'school' ? 'Shule' : service === 'hospital' ? 'Hospitali' : 'Soko'}
                    </Badge>
                  );
                })}
                {nearbyServices.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{nearbyServices.length - 2}
                  </Badge>
                )}
              </div>
            )}

            {/* Rating placeholder */}
            <div className="flex items-center pt-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900 ml-1">4.8</span>
                <span className="text-sm text-gray-500 ml-1">(12 maoni)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PropertyCard;
