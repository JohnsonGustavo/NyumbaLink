import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  X,
  Save,
  User,
  Phone,
  Mail,
  Settings,
  Camera,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type Property = Tables<'properties'>;
type Profile = Tables<'profiles'>;

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  
  // Profile state
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    phone: '',
    user_type: 'landlord'
  });
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    full_address: '',
    property_type: '',
    bedrooms: '',
    bathrooms: '',
    area_sqm: '',
    electricity: false,
    water: false,
    furnished: false,
    parking: false,
    security: false,
    nearby_services: [] as string[],
    images: [] as string[]
  });

  const [properties, setProperties] = useState<Property[]>([]);

  // Fetch profile and properties on component mount
  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchProperties();
      
      // Check if this is a new user (just signed up)
      const userCreatedAt = new Date(user.created_at);
      const now = new Date();
      const timeDiff = now.getTime() - userCreatedAt.getTime();
      const minutesDiff = timeDiff / (1000 * 60);
      
      // If user was created less than 5 minutes ago, consider them new
      if (minutesDiff < 5) {
        setIsNewUser(true);
      }
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }

      if (data) {
        setProfile(data);
        setProfileForm({
          full_name: data.full_name || '',
          phone: data.phone || '',
          user_type: data.user_type || 'landlord'
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        variant: "destructive",
        title: "Hitilafu",
        description: "Imeshindikana kupata maelezo ya akaunti yako"
      });
    }
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('landlord_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        variant: "destructive",
        title: "Hitilafu",
        description: "Imeshindikana kupata nyumba zako"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setProfileLoading(true);
      
      const profileData = {
        user_id: user.id,
        full_name: profileForm.full_name,
        phone: profileForm.phone,
        user_type: profileForm.user_type
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id' });

      if (error) throw error;

      toast({
        title: "Umefanikiwa!",
        description: "Maelezo ya akaunti yako yamebadilishwa kikamilifu"
      });

      setShowProfileDialog(false);
      fetchProfile(); // Refresh profile data
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Hitilafu",
        description: "Imeshindikana kubadilisha maelezo ya akaunti yako"
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfileInputChange = (field: string, value: string) => {
    setProfileForm(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      nearby_services: prev.nearby_services.includes(service)
        ? prev.nearby_services.filter(s => s !== service)
        : [...prev.nearby_services, service]
    }));
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title || '',
      description: property.description || '',
      price: property.price?.toString() || '',
      location: property.location || '',
      full_address: property.full_address || '',
      property_type: property.property_type || '',
      bedrooms: property.bedrooms?.toString() || '',
      bathrooms: property.bathrooms?.toString() || '',
      area_sqm: property.area_sqm?.toString() || '',
      electricity: property.electricity || false,
      water: property.water || false,
      furnished: property.furnished || false,
      parking: property.parking || false,
      security: property.security || false,
      nearby_services: property.nearby_services || [],
      images: property.images || []
    });
    setShowAddForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSubmitting(true);
      
      const propertyData = {
        landlord_id: user.id,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
        full_address: formData.full_address || null,
        property_type: formData.property_type || null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        area_sqm: formData.area_sqm ? parseFloat(formData.area_sqm) : null,
        electricity: formData.electricity,
        water: formData.water,
        furnished: formData.furnished,
        parking: formData.parking,
        security: formData.security,
        nearby_services: formData.nearby_services,
        images: formData.images
      };

      if (editingProperty) {
        const { error } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', editingProperty.id);

        if (error) throw error;

        toast({
          title: "Umefanikiwa!",
          description: "Nyumba yako imesasishwa kikamilifu"
        });
      } else {
        const { error } = await supabase
          .from('properties')
          .insert([propertyData]);

        if (error) throw error;

        toast({
          title: "Umefanikiwa!",
          description: "Nyumba yako imeongezwa kikamilifu"
        });
      }

      setShowAddForm(false);
      setEditingProperty(null);
      resetForm();
      fetchProperties();
    } catch (error) {
      console.error('Error saving property:', error);
      toast({
        variant: "destructive",
        title: "Hitilafu",
        description: editingProperty ? "Imeshindikana kusasisha nyumba yako" : "Imeshindikana kuongeza nyumba yako"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      full_address: '',
      property_type: '',
      bedrooms: '',
      bathrooms: '',
      area_sqm: '',
      electricity: false,
      water: false,
      furnished: false,
      parking: false,
      security: false,
      nearby_services: [],
      images: []
    });
  };

  const handleCancelEdit = () => {
    setShowAddForm(false);
    setEditingProperty(null);
    resetForm();
  };

  const handleDeleteProperty = async (id: string) => {
    if (!confirm('Una uhakika unataka kufuta tangazo hili?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Umefanikiwa!",
        description: "Nyumba imefutwa kikamilifu"
      });

      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        variant: "destructive",
        title: "Hitilafu",
        description: "Imeshindikana kufuta nyumba"
      });
    }
  };

  // Calculate stats
  const totalViews = properties.reduce((sum, property) => sum + (property.views_count || 0), 0);
  const averagePrice = properties.length > 0 
    ? properties.reduce((sum, property) => sum + Number(property.price), 0) / properties.length
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Inapakia...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Welcome Banner for New Users */}
      {isNewUser && (
        <div className="bg-gradient-to-r from-primary to-serengeti-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  🎉 Karibu kwenye Nyumba Link!
                </h2>
                <p className="text-lg opacity-90">
                  Anza safari yako ya kuongeza nyumba zako na kupata wapangaji
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => setIsNewUser(false)}
                className="bg-white text-primary hover:bg-gray-100"
              >
                ✕
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Profile Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Dashibodi ya Mwenye Nyumba
            </h1>
            <p className="text-gray-600 mt-2">
              Simamia nyumba zako na angalia takwimu
            </p>
          </div>

          {/* Profile Card */}
          <Card className="w-full lg:w-auto lg:min-w-[300px]">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-white">
                    {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {profile?.full_name || 'Jina halijawekwa'}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {user?.email}
                  </p>
                  {profile?.phone && (
                    <p className="text-sm text-gray-600 truncate">
                      📞 {profile.phone}
                    </p>
                  )}
                </div>
                <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Sasisha Maelezo ya Akaunti
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="full_name">Jina Kamili</Label>
                        <Input
                          id="full_name"
                          value={profileForm.full_name}
                          onChange={(e) => handleProfileInputChange('full_name', e.target.value)}
                          placeholder="Weka jina lako kamili"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Nambari ya Simu</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => handleProfileInputChange('phone', e.target.value)}
                          placeholder="+255712345678"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="user_type">Aina ya Mtumiaji</Label>
                        <Input
                          value="Mwenye Nyumba/Mpangisha"
                          disabled
                          className="bg-gray-50 text-gray-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Aina ya akaunti haiwezi kubadilishwa
                        </p>
                      </div>

                      <div className="flex justify-end space-x-2 pt-4">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setShowProfileDialog(false)}
                          disabled={profileLoading}
                        >
                          Sitisha
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={profileLoading}
                          className="bg-primary hover:bg-primary/90"
                        >
                          {profileLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Inahifadhi...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Hifadhi
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              
              {/* Profile completion status */}
              <div className="mt-3 pt-3 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Akaunti imekamilika:</span>
                  <div className="flex items-center">
                    {profile?.full_name && profile?.phone ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-green-600 font-medium">100%</span>
                      </>
                    ) : (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-orange-500 mr-1"></div>
                        <span className="text-orange-600 font-medium">
                          {profile?.full_name || profile?.phone ? '50%' : '0%'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {(!profile?.full_name || !profile?.phone) && (
                  <p className="text-xs text-orange-600 mt-1">
                    Kamilisha maelezo yako ili kupata huduma bora zaidi
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button 
            onClick={() => setShowAddForm(true)} 
            className={`bg-primary hover:bg-primary/90 flex-1 sm:flex-none ${
              isNewUser ? 'animate-pulse shadow-lg ring-2 ring-primary/50' : ''
            }`}
          >
            <Plus className="h-4 w-4 mr-2" />
            {isNewUser ? 'Anza Kuongeza Nyumba Yako ya Kwanza!' : 'Ongeza Nyumba Mpya'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setShowProfileDialog(true)}
            className="flex-1 sm:flex-none"
          >
            <User className="h-4 w-4 mr-2" />
            Sasisha Akaunti
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Jumla ya Nyumba</p>
                  <p className="text-3xl font-bold text-gray-900">{properties.length}</p>
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
                  <p className="text-sm font-medium text-gray-600">Nyumba Zinazoonekana</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {properties.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
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

        {/* Add/Edit property form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {editingProperty ? 'Sasisha Nyumba' : 'Ongeza Nyumba Mpya'}
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleCancelEdit}
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
                      <Label htmlFor="property_type">Aina ya Nyumba</Label>
                      <Select value={formData.property_type} onValueChange={(value) => handleInputChange('property_type', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chagua aina ya nyumba" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Ghorofa</SelectItem>
                          <SelectItem value="house">Nyumba</SelectItem>
                          <SelectItem value="room">Chumba</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bedrooms">Vyumba vya Kulala</Label>
                        <Input
                          id="bedrooms"
                          type="number"
                          value={formData.bedrooms}
                          onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                          placeholder="2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bathrooms">Vyumba vya Kuogea</Label>
                        <Input
                          id="bathrooms"
                          type="number"
                          value={formData.bathrooms}
                          onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                          placeholder="1"
                        />
                      </div>
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
                        <div className="flex items-center justify-between">
                          <span>Vifaa vya Nyumbani</span>
                          <Switch
                            checked={formData.furnished}
                            onCheckedChange={(checked) => handleInputChange('furnished', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Mahali pa Kuegesha Gari</span>
                          <Switch
                            checked={formData.parking}
                            onCheckedChange={(checked) => handleInputChange('parking', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Usalama</span>
                          <Switch
                            checked={formData.security}
                            onCheckedChange={(checked) => handleInputChange('security', checked)}
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
                              checked={formData.nearby_services.includes(service)}
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

                {/* Image Upload Section */}
                <div className="border-t pt-6">
                  <ImageUpload
                    images={formData.images}
                    onImagesChange={(images) => handleInputChange('images', images)}
                  />
                </div>

                {/* Submit buttons */}
                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={submitting}
                  >
                    Sitisha
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90"
                    disabled={submitting}
                  >
                    {submitting ? (editingProperty ? 'Inasasisha...' : 'Inaongeza...') : (editingProperty ? 'Sasisha Nyumba' : 'Ongeza Nyumba')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Properties list */}
        <Card>
          <CardHeader>
            <CardTitle>Nyumba Zako</CardTitle>
          </CardHeader>
          <CardContent>
            {properties.length === 0 ? (
              <div className="text-center py-8">
                <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isNewUser ? 'Karibu! Anza kuongeza nyumba zako' : 'Hakuna nyumba zilizosajiliwa'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {isNewUser 
                    ? 'Bonyeza kitufe hapo chini kuongeza nyumba yako ya kwanza na kuanza kupata wapangaji'
                    : 'Anza kwa kuongeza nyumba yako ya kwanza'
                  }
                </p>
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className={isNewUser ? 'bg-primary hover:bg-primary/90 shadow-lg' : ''}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isNewUser ? 'Ongeza Nyumba Yako ya Kwanza' : 'Ongeza Nyumba'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        {/* Image display */}
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center">
                          {property.images && property.images.length > 0 ? (
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling!.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <Home className={`h-8 w-8 text-gray-400 ${property.images && property.images.length > 0 ? 'hidden' : ''}`} />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 mb-1">
                            {property.title}
                          </h3>
                          <p className="text-gray-600 mb-2 line-clamp-2">
                            {property.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>📍 {property.location}</span>
                            <span>💰 TZS {Number(property.price).toLocaleString()}/mwezi</span>
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge 
                              className={property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                            >
                              {property.status === 'active' ? 'Inaonekana' : 'Imesitishwa'}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              👁️ {property.views_count || 0} miwani
                            </span>
                            {property.images && property.images.length > 0 && (
                              <span className="text-sm text-gray-600">
                                📷 {property.images.length} picha
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Link to={`/property/${property.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditProperty(property)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteProperty(property.id)}
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