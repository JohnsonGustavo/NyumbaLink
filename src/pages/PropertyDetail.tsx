import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Zap, 
  Droplets, 
  School, 
  Building2, 
  ShoppingCart,
  Phone,
  Mail,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // Sample property data (in real app, this would come from API)
  const property = {
    id: id,
    title: 'Nyumba ya Kisasa Mikocheni',
    description: 'Nyumba nzuri ya vyumba 3 na jiko la kisasa. Ina bustani ndogo na nafasi ya gari. Mazingira mazuri na usalama wa juu. Nyumba hii ina vyumba 3 vya kulala, sebule kubwa, jiko la kisasa, na choo 2. Kuna bustani ndogo nyuma ya nyumba na nafasi ya gari mbele. Eneo ni salama na lina usalama wa usiku na mchana.',
    price: 800000,
    location: 'Mikocheni, Dar es Salaam',
    fullAddress: 'Barabara ya Mikocheni, Klabu ya Mikocheni, Dar es Salaam, Tanzania',
    images: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
    ],
    utilities: { electricity: true, water: true },
    nearbyServices: ['school', 'hospital', 'market'],
    landlord: { 
      name: 'Mwalimu John Mwangi', 
      phone: '+255712345678', 
      email: 'john.mwangi@example.com',
      verified: true
    },
    features: [
      'Vyumba 3 vya kulala',
      'Sebule kubwa',
      'Jiko la kisasa',
      'Choo 2',
      'Bustani ndogo',
      'Nafasi ya gari',
      'Usalama wa juu',
      'Mazingira mazuri'
    ],
    rules: [
      'Hakuna paka au mbwa',
      'Hakuna kelele za ziada baada ya saa 10 jioni',
      'Malipo ya kodi yawe mapema kila mwezi',
      'Mazingira yawe safi kila wakati'
    ]
  };

  const serviceIcons = {
    school: { icon: School, label: 'Shule' },
    hospital: { icon: Building2, label: 'Hospitali' },
    market: { icon: ShoppingCart, label: 'Soko' }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Rudi Nyuma
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation arrows */}
                  {property.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {/* Image counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFavorited(!isFavorited)}
                      className={`bg-white/80 hover:bg-white ${
                        isFavorited ? 'text-red-500' : 'text-gray-600'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/80 hover:bg-white text-gray-600"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Image thumbnails */}
                {property.images.length > 1 && (
                  <div className="p-4 flex space-x-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          index === currentImageIndex 
                            ? 'border-primary' 
                            : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Property details */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {property.title}
                      </h1>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">
                          TZS {property.price.toLocaleString()}
                        </div>
                        <div className="text-gray-600">kwa mwezi</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{property.fullAddress}</span>
                    </div>

                    {/* Utilities and services */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.utilities.electricity && (
                        <Badge className="bg-green-100 text-green-800">
                          <Zap className="h-3 w-3 mr-1" />
                          Umeme
                        </Badge>
                      )}
                      {property.utilities.water && (
                        <Badge className="bg-blue-100 text-blue-800">
                          <Droplets className="h-3 w-3 mr-1" />
                          Maji
                        </Badge>
                      )}
                      {property.nearbyServices.map((service) => {
                        const serviceInfo = serviceIcons[service as keyof typeof serviceIcons];
                        if (!serviceInfo) return null;
                        const { icon: ServiceIcon, label } = serviceInfo;
                        return (
                          <Badge key={service} variant="secondary">
                            <ServiceIcon className="h-3 w-3 mr-1" />
                            {label} karibu
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  <Separator />

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Maelezo</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {property.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Vipengele</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Rules */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Sheria za Nyumba</h3>
                    <div className="space-y-2">
                      {property.rules.map((rule, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
                          <span className="text-gray-700">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact landlord */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Wasiliana na Mwenye Nyumba</h3>
                
                <div className="space-y-4">
                  {/* Landlord info */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {property.landlord.name}
                        {property.landlord.verified && (
                          <Badge className="ml-2 bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">Mwenye Nyumba</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Contact options */}
                  <div className="space-y-3">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Phone className="h-4 w-4 mr-2" />
                      Piga Simu: {property.landlord.phone}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Tuma Barua Pepe
                    </Button>
                  </div>

                  <div className="text-sm text-gray-600 text-center">
                    Wasiliana moja kwa moja na mwenye nyumba kwa maelezo zaidi
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Mahali</h3>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-sm">Ramani itaongezwa hapa</div>
                    <div className="text-xs mt-1">{property.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety tips */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Vidokezo vya Usalama</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>• Tembelea nyumba kabla ya kulipa fedha yoyote</div>
                  <div>• Hakikisha utambulisho wa mwenye nyumba ni wa kweli</div>
                  <div>• Soma makubaliano yote kwa makini</div>
                  <div>• Usitume fedha bila kuona nyumba</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
