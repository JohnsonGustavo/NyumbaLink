
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Star, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  images: string[];
  phone?: string;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
  viewMode?: 'grid' | 'list';
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  price,
  location,
  images,
  phone,
  isFavorited = false,
  onToggleFavorite,
  viewMode = 'grid'
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-xl text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                    {title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{location}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">4.8</span>
                    <span className="text-sm text-gray-500 ml-1">(12 maoni)</span>
                  </div>
                  
                  {/* WhatsApp Contact Button */}
                  {phone && (
                    <a
                      href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-full text-xs transition-colors"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Piga
                    </a>
                  )}
                </div>
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
            />
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

        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Title and location */}
            <div>
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <div className="flex items-center text-gray-500 text-sm">
                <span className="line-clamp-1">{location}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900 ml-1">4.8</span>
              <span className="text-sm text-gray-500 ml-1">(12)</span>
            </div>

            {/* Price and Contact */}
            <div className="pt-1 flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-gray-900">
                  TZS {price.toLocaleString()}
                </span>
                <span className="text-gray-500 ml-1 text-sm">/mwezi</span>
              </div>
              
              {/* WhatsApp Contact Button */}
              {phone && (
                <a
                  href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-full text-xs transition-colors"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Piga
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PropertyCard;
