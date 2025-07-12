/**
 * PROPERTYDETAIL.TSX - DYNAMIC PROPERTY DETAILS PAGE
 * =================================================
 * 
 * Ukurasa wa maelezo ya nyumba kutoka database - Property details page from database
 * 
 * FUNCTIONALITY / KAZI:
 * - Fetches real property data from Supabase database (Kupata data halisi kutoka database)
 * - Displays property images, details, and landlord contact info (Kuonyesha picha, maelezo, na mawasiliano)
 * - Provides WhatsApp and phone contact integration (Kuunganisha WhatsApp na simu)
 * - Handles loading and error states gracefully (Kushughulikia hali za kupakia na makosa)
 * 
 * DATA FLOW / MTIRIRIKO WA DATA:
 * URL Parameter (id) → useProperties Hook → Filter by ID → Display Real Data
 * 
 * FEATURES / VIPENGELE:
 * - Real property images from database (Picha halisi kutoka database)
 * - Actual landlord contact information (Maelezo halisi ya mwenye nyumba)
 * - Dynamic property details and amenities (Maelezo ya nyumba yanayobadilika)
 * - Error handling for missing properties (Kushughulikia nyumba zisizopo)
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/ui/loading-spinner';
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
  ChevronRight,
  Home,
  AlertCircle
} from 'lucide-react';
import { useProperties } from '@/hooks/useProperties';

/**
 * PROPERTY DETAIL COMPONENT
 * ========================
 * 
 * Main component that fetches and displays detailed property information
 * from the database based on the property ID from the URL.
 * 
 * Kipengele kikuu kinachopata na kuonyesha maelezo ya kina ya nyumba
 * kutoka database kulingana na ID ya nyumba kutoka URL.
 */
const PropertyDetail = () => {
  // URL parameter extraction - Kupata vigezo kutoka URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // UI state management - Usimamizi wa hali ya UI
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // Data fetching from database - Kupata data kutoka database
  const { data: properties = [], isLoading, error } = useProperties();

  /**
   * PROPERTY DATA FILTERING
   * ======================
   * 
   * Find the specific property from the fetched properties array
   * using the ID from the URL parameters.
   * 
   * Kutafuta nyumba maalum kutoka orodha ya nyumba zilizochukuliwa
   * kwa kutumia ID kutoka vigezo vya URL.
   */
  const property = properties.find(p => p.id === id);

  /**
   * SERVICE ICONS MAPPING
   * ====================
   * 
   * Maps service names to their corresponding icons and labels
   * for consistent display across the component.
   * 
   * Kuunganisha majina ya huduma na ikoni zao na lebo
   * kwa kuonyesha kwa njia sawa katika kipengele.
   */
  const serviceIcons = {
    school: { icon: School, label: 'Shule' },
    hospital: { icon: Building2, label: 'Hospitali' },
    market: { icon: ShoppingCart, label: 'Soko' },
    bank: { icon: Building2, label: 'Benki' },
    transport: { icon: Building2, label: 'Usafiri' }
  };

  /**
   * IMAGE NAVIGATION FUNCTIONS
   * =========================
   * 
   * Handle navigation through property images in the carousel.
   * Provides smooth cycling through available images.
   * 
   * Kushughulikia uongozaji kupitia picha za nyumba katika carousel.
   * Kutoa mzunguko laini kupitia picha zinazopatikana.
   */
  const nextImage = () => {
    if (!property?.images || property.images.length === 0) return;
    setCurrentImageIndex((prev) => 
      prev === property.images!.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!property?.images || property.images.length === 0) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images!.length - 1 : prev - 1
    );
  };

  /**
   * WHATSAPP INTEGRATION
   * ===================
   * 
   * Creates a WhatsApp link with pre-filled message for easy communication
   * between potential tenants and landlords.
   * 
   * Kuunda kiungo cha WhatsApp na ujumbe uliojazwa awali kwa mawasiliano rahisi
   * kati ya wapangaji watarajiwa na wenye nyumba.
   */
  const getWhatsAppLink = () => {
    if (!property?.contact_whatsapp_phone && !property?.contact_phone) return '#';
    
    const phoneNumber = property.contact_whatsapp_phone || property.contact_phone;
    const cleanPhone = phoneNumber!.replace(/[^0-9]/g, '');
    const message = `Hujambo, ninapenda kujua zaidi kuhusu nyumba hii: ${property.title}`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  /**
   * LOADING STATE RENDERING
   * ======================
   * 
   * Display loading spinner while data is being fetched from the database.
   * Provides user feedback during data loading process.
   * 
   * Kuonyesha spinner ya kupakia wakati data inapochukuliwa kutoka database.
   * Kutoa maoni ya mtumiaji wakati wa mchakato wa kupakia data.
   */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-lg text-gray-600">Inapakia maelezo ya nyumba...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /**
   * ERROR STATE RENDERING
   * ====================
   * 
   * Display error message if data fetching fails or property is not found.
   * Provides clear feedback and navigation options for users.
   * 
   * Kuonyesha ujumbe wa hitilafu ikiwa kupata data kumeshindikana au nyumba haijapatikana.
   * Kutoa maoni wazi na chaguo za uongozaji kwa watumiaji.
   */
  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {error ? 'Hitilafu ya kupakia data' : 'Nyumba haijapatikana'}
            </h2>
            <p className="text-gray-600 mb-8">
              {error 
                ? 'Imeshindikana kupata maelezo ya nyumba. Tafadhali jaribu tena.' 
                : 'Nyumba uliyotafuta haijapatikana. Huenda imeondolewa au ID si sahihi.'
              }
            </p>
            <div className="space-x-4">
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Rudi Nyuma
              </Button>
              <Button onClick={() => navigate('/browse')}>
                <Home className="h-4 w-4 mr-2" />
                Tazama Nyumba Zingine
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /**
   * MAIN COMPONENT RENDERING
   * =======================
   * 
   * Render the complete property details page with real data from database.
   * Includes image gallery, property information, and landlord contact details.
   * 
   * Kuonyesha ukurasa kamili wa maelezo ya nyumba na data halisi kutoka database.
   * Inajumuisha galeri ya picha, maelezo ya nyumba, na maelezo ya mawasiliano ya mwenye nyumba.
   */
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation Button - Kitufe cha kurudi nyuma */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Rudi Nyuma
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Section - Sehemu ya maudhui makuu */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery Section - Sehemu ya galeri ya picha */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                  {/* Main Image Display - Onyesho la picha kuu */}
                  <img
                    src={
                      property.images && property.images.length > 0 
                        ? property.images[currentImageIndex]
                        : 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop'
                    }
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image Navigation Arrows - Mishale ya uongozaji wa picha */}
                  {property.images && property.images.length > 1 && (
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

                  {/* Image Counter - Kihesabu cha picha */}
                  {property.images && property.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {property.images.length}
                    </div>
                  )}

                  {/* Action Buttons - Vitufe vya vitendo */}
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

                {/* Image Thumbnails - Picha ndogo za uchaguzi */}
                {property.images && property.images.length > 1 && (
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

            {/* Property Details Card - Kadi ya maelezo ya nyumba */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Property Header - Kichwa cha nyumba */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {property.title}
                      </h1>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">
                          TZS {Number(property.price).toLocaleString()}
                        </div>
                        <div className="text-gray-600">kwa mwezi</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{property.full_address || property.location}</span>
                    </div>

                    {/* Utilities and Services Badges - Lebo za huduma na vifaa */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.electricity && (
                        <Badge className="bg-green-100 text-green-800">
                          <Zap className="h-3 w-3 mr-1" />
                          Umeme
                        </Badge>
                      )}
                      {property.water && (
                        <Badge className="bg-blue-100 text-blue-800">
                          <Droplets className="h-3 w-3 mr-1" />
                          Maji
                        </Badge>
                      )}
                      {property.furnished && (
                        <Badge className="bg-purple-100 text-purple-800">
                          🪑 Vifaa vya Nyumbani
                        </Badge>
                      )}
                      {property.parking && (
                        <Badge className="bg-gray-100 text-gray-800">
                          🚗 Parking
                        </Badge>
                      )}
                      {property.security && (
                        <Badge className="bg-red-100 text-red-800">
                          🔒 Usalama
                        </Badge>
                      )}
                      {property.nearby_services?.map((service) => {
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

                  {/* Property Description - Maelezo ya nyumba */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Maelezo</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {property.description || 'Hakuna maelezo ya ziada yaliyotolewa kwa nyumba hii.'}
                    </p>
                  </div>

                  <Separator />

                  {/* Property Features - Vipengele vya nyumba */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Vipengele vya Nyumba</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {property.property_type && (
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-gray-700">
                            Aina: {property.property_type === 'apartment' ? 'Ghorofa' : 
                                   property.property_type === 'house' ? 'Nyumba' :
                                   property.property_type === 'room' ? 'Chumba' :
                                   property.property_type === 'studio' ? 'Studio' : property.property_type}
                          </span>
                        </div>
                      )}
                      {property.bedrooms && (
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-gray-700">Vyumba vya kulala: {property.bedrooms}</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-gray-700">Vyumba vya kuogea: {property.bathrooms}</span>
                        </div>
                      )}
                      {property.area_sqm && (
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-gray-700">Ukubwa: {property.area_sqm} m²</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Section - Sehemu ya upande */}
          <div className="space-y-6">
            {/* Landlord Contact Card - Kadi ya mawasiliano ya mwenye nyumba */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Wasiliana na Mwenye Nyumba</h3>
                
                <div className="space-y-4">
                  {/* Landlord Information - Maelezo ya mwenye nyumba */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {property.profiles?.full_name || 'Mwenye Nyumba'}
                        <Badge className="ml-2 bg-green-100 text-green-800">
                          Verified
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">Mwenye Nyumba</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Options - Chaguo za mawasiliano */}
                  <div className="space-y-3">
                    {property.contact_phone && (
                      <>
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() => window.open(`tel:${property.contact_phone}`, '_self')}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Piga Simu: {property.contact_phone}
                        </Button>
                        {(property.contact_whatsapp_phone || property.contact_phone) && (
                          <Button 
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => window.open(getWhatsAppLink(), '_blank')}
                          >
                            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                            WhatsApp: {property.contact_whatsapp_phone || property.contact_phone}
                          </Button>
                        )}
                      </>
                    )}
                    
                    {!property.contact_phone && (
                      <div className="text-center text-gray-500 py-4">
                        <Phone className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Maelezo ya mawasiliano hayajapatikana</p>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 text-center">
                    Wasiliana moja kwa moja na mwenye nyumba kwa maelezo zaidi
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Map Placeholder - Mahali pa ramani */}
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

            {/* Safety Tips Card - Kadi ya vidokezo vya usalama */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Vidokezo vya Usalama</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>• Tembelea nyumba kabla ya kulipa fedha yoyote</div>
                  <div>• Hakikisha utambulisho wa mwenye nyumba ni wa kweli</div>
                  <div>• Soma makubaliano yote kwa makini</div>
                  <div>• Usitume fedha bila kuona nyumba</div>
                  <div>• Wasiliana kupitia njia rasmi za mawasiliano</div>
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