
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Home, 
  TrendingUp,
  Users,
  DollarSign,
  Upload,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    fullAddress: '',
    electricity: false,
    water: false,
    nearbyServices: [] as string[],
    images: [] as string[]
  });

  // Sample listings data
  const [listings, setListings] = useState([
    {
      id: '1',
      title: 'Nyumba ya Kisasa Mikocheni',
      description: 'Nyumba nzuri ya vyumba 3 na jiko la kisasa...',
      price: 800000,
      location: 'Mikocheni, Dar es Salaam',
      status: 'active',
      views: 156,
      inquiries: 8,
      images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop']
    },
    {
      id: '2',
      title: 'Apartmenti ya Ufukweni',
      description: 'Chumba kimoja na jiko. Karibu na barabara kuu...',
      price: 400000,
      location: 'Mwananyamala, Dar es Salaam',
      status: 'active',
      views: 89,
      inquiries: 12,
      images: ['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop']
    }
  ]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      nearbyServices: prev.nearbyServices.includes(service)
        ? prev.nearbyServices.filter(s => s !== service)
        : [...prev.nearbyServices, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would submit to your backend
    setShowAddForm(false);
    // Reset form
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      fullAddress: '',
      electricity: false,
      water: false,
      nearbyServices: [],
      images: []
    });
  };

  const handleDeleteListing = (id: string) => {
    if (confirm('Una uhakika unataka kufuta tangazo hili?')) {
      setListings(prev => prev.filter(listing => listing.id !== id));
    }
  };

  const totalViews = listings.reduce((sum, listing) => sum + listing.views, 0);
  const totalInquiries = listings.reduce((sum, listing) => sum + listing.inquiries, 0);
  const averagePrice = listings.length > 0 
    ? listings.reduce((sum, listing) => sum + listing.price, 0) / listings.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashibodi ya Mwenye Nyumba
            </h1>
            <p className="text-gray-600 mt-2">
              Simamia nyumba zako na angalia takwimu
            </p>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Ongeza Nyumba Mpya
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Jumla ya Nyumba</p>
                  <p className="text-3xl font-bold text-gray-900">{listings.length}</p>
                </div>
                <Home className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Jumla ya Miwani</p>
                  <p className="text-3xl font-bold text-gray-900">{totalViews}</p>
                </div>
                <Eye className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Maswali</p>
                  <p className="text-3xl font-bold text-gray-900">{totalInquiries}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bei ya Wastani</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {averagePrice ? `TZS ${Math.round(averagePrice).toLocaleString()}` : 'TZS 0'}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add new property form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Ongeza Nyumba Mpya</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAddForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic info */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Jina la Nyumba *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Mfano: Nyumba ya Kisasa Mikocheni"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="price">Bei ya Kodi (TZS) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="800000"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Eneo *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Mikocheni, Dar es Salaam"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="fullAddress">Anwani kamili</Label>
                      <Input
                        id="fullAddress"
                        value={formData.fullAddress}
                        onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                        placeholder="Barabara ya Mikocheni, Klabu ya Mikocheni..."
                      />
                    </div>
                  </div>

                  {/* Description and features */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Maelezo *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Elezea nyumba yako kwa undani..."
                        rows={4}
                        required
                      />
                    </div>

                    {/* Utilities */}
                    <div>
                      <Label>Huduma za Msingi</Label>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center justify-between">
                          <span>Umeme</span>
                          <Switch
                            checked={formData.electricity}
                            onCheckedChange={(checked) => handleInputChange('electricity', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Maji</span>
                          <Switch
                            checked={formData.water}
                            onCheckedChange={(checked) => handleInputChange('water', checked)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Nearby services */}
                    <div>
                      <Label>Huduma za Karibu</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {['school', 'hospital', 'market', 'bank', 'transport'].map((service) => (
                          <label key={service} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.nearbyServices.includes(service)}
                              onChange={() => handleServiceToggle(service)}
                            />
                            <span className="text-sm">
                              {service === 'school' ? 'Shule' :
                               service === 'hospital' ? 'Hospitali' :
                               service === 'market' ? 'Soko' :
                               service === 'bank' ? 'Benki' : 'Usafiri'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image upload placeholder */}
                <div>
                  <Label>Picha za Nyumba</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Bofya hapa kupakia picha au buruta hapa</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG hadi 5MB</p>
                  </div>
                </div>

                {/* Submit buttons */}
                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Sitisha
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Ongeza Nyumba
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Listings table */}
        <Card>
          <CardHeader>
            <CardTitle>Nyumba Zako</CardTitle>
          </CardHeader>
          <CardContent>
            {listings.length === 0 ? (
              <div className="text-center py-8">
                <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Hakuna nyumba zilizosajiliwa
                </h3>
                <p className="text-gray-600 mb-4">
                  Anza kwa kuongeza nyumba yako ya kwanza
                </p>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ongeza Nyumba
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div key={listing.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        {/* Image */}
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 mb-1">
                            {listing.title}
                          </h3>
                          <p className="text-gray-600 mb-2 line-clamp-2">
                            {listing.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>📍 {listing.location}</span>
                            <span>💰 TZS {listing.price.toLocaleString()}/mwezi</span>
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge 
                              className={listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                            >
                              {listing.status === 'active' ? 'Inaonekana' : 'Imesitishwa'}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              👁️ {listing.views} miwani
                            </span>
                            <span className="text-sm text-gray-600">
                              💬 {listing.inquiries} maswali
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Link to={`/property/${listing.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteListing(listing.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
