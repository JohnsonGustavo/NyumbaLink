import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Edit2, 
  Trash2, 
  Eye, 
  Home, 
  MapPin,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Tables } from '@/integrations/supabase/types';

type Property = Tables<'properties'>;

interface PropertyGridProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ 
  properties, 
  onEdit, 
  onDelete 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sw-TZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (properties.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-200 hover:border-primary/50 transition-colors">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Home className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Hakuna nyumba zilizosajiliwa
          </h3>
          <p className="text-gray-600 mb-6 max-w-md">
            Anza kwa kuongeza nyumba yako ya kwanza na kuanza kupata wapangaji
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-primary hover:bg-primary/90">
              <Home className="h-4 w-4 mr-2" />
              Ongeza Nyumba ya Kwanza
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Ona Mfano
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card 
          key={property.id} 
          className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="relative">
            {/* Property Image */}
            <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              {property.images && property.images.length > 0 ? (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling!.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`${property.images && property.images.length > 0 ? 'hidden' : 'flex'} w-full h-full items-center justify-center`}>
                <Home className="h-16 w-16 text-gray-400" />
              </div>
            </div>

            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <Badge 
                className={`${
                  property.status === 'active' 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-gray-500 hover:bg-gray-600'
                } text-white border-0`}
              >
                {property.status === 'active' ? 'Inaonekana' : 'Imesitishwa'}
              </Badge>
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex space-x-1">
                <Link to={`/property/${property.id}`}>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => onEdit(property)}
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => onDelete(property.id)}
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Title and Price */}
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
                  {property.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    TZS {Number(property.price).toLocaleString()}
                  </div>
                  <span className="text-sm text-gray-500">/mwezi</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm line-clamp-1">{property.location}</span>
              </div>

              {/* Property Details */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  {property.bedrooms && (
                    <span>🛏️ {property.bedrooms}</span>
                  )}
                  {property.bathrooms && (
                    <span>🚿 {property.bathrooms}</span>
                  )}
                  {property.area_sqm && (
                    <span>📐 {property.area_sqm}m²</span>
                  )}
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-1">
                {property.electricity && (
                  <Badge variant="secondary" className="text-xs">⚡ Umeme</Badge>
                )}
                {property.water && (
                  <Badge variant="secondary" className="text-xs">💧 Maji</Badge>
                )}
                {property.parking && (
                  <Badge variant="secondary" className="text-xs">🚗 Parking</Badge>
                )}
                {property.security && (
                  <Badge variant="secondary" className="text-xs">🔒 Usalama</Badge>
                )}
              </div>

              {/* Stats and Date */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>{property.views_count || 0} miwani</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(property.created_at)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PropertyGrid;