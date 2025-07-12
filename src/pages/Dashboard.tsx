import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ImageUpload from '@/components/ImageUpload';
import StatsCard from '@/components/dashboard/StatsCard';
import PropertyGrid from '@/components/dashboard/PropertyGrid';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import QuickActions from '@/components/dashboard/QuickActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  X,
  Save,
  User,
  Home, 
  TrendingUp,
  Eye,
  DollarSign,
  Calendar,
  Filter,
  Search,
  Grid3X3,
  List,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type Property = Tables<'properties'>;
type Profile = Tables<'profiles'>;

/**
 * DASHBOARD COMPONENT - MODERN LANDLORD MANAGEMENT INTERFACE
 * =========================================================
 * 
 * Enhanced dashboard with modern UI, better engagement, and responsive design.
 * Provides comprehensive property management for landlords with intuitive interface.
 * 
 * KEY FEATURES:
 * - Modern card-based layout with visual hierarchy
 * - Interactive property management with hover effects
 * - Responsive design optimized for all devices
 * - Enhanced onboarding experience for new users
 * - Real-time statistics and performance metrics
 * - Streamlined property creation and editing workflow
 */
const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // UI State Management
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Data State
  const [profile, setProfile] = useState<Profile | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  
  // Form State
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

  /**
   * INITIALIZATION AND DATA FETCHING
   * ================================
   */
  useEffect(() => {
    if (user) {
      initializeDashboard();
    }
  }, [user]);

  const initializeDashboard = async () => {
    await Promise.all([
      fetchProfile(),
      fetchProperties()
    ]);
    
    checkIfNewUser();
  };

  const checkIfNewUser = () => {
    if (!user) return;
    
    const userCreatedAt = new Date(user.created_at);
    const now = new Date();
    const timeDiff = now.getTime() - userCreatedAt.getTime();
    const minutesDiff = timeDiff / (1000 * 60);
    
    // Consider user new if created less than 5 minutes ago
    if (minutesDiff < 5) {
      setIsNewUser(true);
    }
  };

  /**
   * PROFILE MANAGEMENT
   * =================
   */
  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
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
      fetchProfile();
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

  /**
   * PROPERTY MANAGEMENT
   * ==================
   */
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

  const handlePropertySubmit = async (e: React.FormEvent) => {
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

      handleCloseForm();
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

  /**
   * FORM MANAGEMENT
   * ==============
   */
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

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingProperty(null);
    resetForm();
  };

  /**
   * FILTERING AND SEARCH
   * ===================
   */
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  /**
   * STATISTICS CALCULATION
   * =====================
   */
  const totalViews = properties.reduce((sum, property) => sum + (property.views_count || 0), 0);
  const averagePrice = properties.length > 0 
    ? properties.reduce((sum, property) => sum + Number(property.price), 0) / properties.length
    : 0;
  const activeProperties = properties.filter(p => p.status === 'active').length;

  /**
   * LOADING STATE
   * ============
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <RefreshCw className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
              <p className="text-lg text-gray-600">Inapakia dashibodi yako...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * MAIN RENDER
   * ===========
   */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <WelcomeBanner
          profile={profile}
          user={user}
          isNewUser={isNewUser}
          onProfileEdit={() => setShowProfileDialog(true)}
          onDismissWelcome={() => setIsNewUser(false)}
          propertiesCount={properties.length}
        />

        {/* Quick Actions */}
        <QuickActions
          onAddProperty={() => setShowAddForm(true)}
          onEditProfile={() => setShowProfileDialog(true)}
          isNewUser={isNewUser}
          propertiesCount={properties.length}
        />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Jumla ya Nyumba"
            value={properties.length}
            icon={Home}
            trend={{ value: 12, isPositive: true }}
            gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            title="Jumla ya Miwani"
            value={totalViews}
            icon={Eye}
            trend={{ value: 8, isPositive: true }}
            gradient="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatsCard
            title="Nyumba Zinazoonekana"
            value={activeProperties}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            gradient="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatsCard
            title="Bei ya Wastani"
            value={averagePrice ? `TZS ${Math.round(averagePrice).toLocaleString()}` : 'TZS 0'}
            icon={DollarSign}
            gradient="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

        {/* Properties Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b bg-white/50">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Nyumba Zako ({filteredProperties.length})
                </CardTitle>
                <p className="text-gray-600 mt-1">
                  Simamia na usasisha nyumba zako zote
                </p>
              </div>
              
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tafuta nyumba..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Hali" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Zote</SelectItem>
                    <SelectItem value="active">Zinazoonekana</SelectItem>
                    <SelectItem value="inactive">Zimesitishwa</SelectItem>
                  </SelectContent>
                </Select>

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
          </CardHeader>
          
          <CardContent className="p-6">
            <PropertyGrid
              properties={filteredProperties}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
            />
          </CardContent>
        </Card>

        {/* Add/Edit Property Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">
                    {editingProperty ? 'Sasisha Nyumba' : 'Ongeza Nyumba Mpya'}
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleCloseForm}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handlePropertySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
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

                    {/* Description and Features */}
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
                          {[
                            { key: 'electricity', label: 'Umeme' },
                            { key: 'water', label: 'Maji' },
                            { key: 'furnished', label: 'Vifaa vya Nyumbani' },
                            { key: 'parking', label: 'Mahali pa Kuegesha Gari' },
                            { key: 'security', label: 'Usalama' }
                          ].map(({ key, label }) => (
                            <div key={key} className="flex items-center justify-between">
                              <span>{label}</span>
                              <Switch
                                checked={formData[key as keyof typeof formData] as boolean}
                                onCheckedChange={(checked) => handleInputChange(key, checked)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Nearby Services */}
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

                  {/* Image Upload */}
                  <div className="border-t pt-6">
                    <ImageUpload
                      images={formData.images}
                      onImagesChange={(images) => handleInputChange('images', images)}
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleCloseForm}
                      disabled={submitting}
                    >
                      Sitisha
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          {editingProperty ? 'Inasasisha...' : 'Inaongeza...'}
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {editingProperty ? 'Sasisha Nyumba' : 'Ongeza Nyumba'}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profile Edit Dialog */}
        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
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
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
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
    </div>
  );
};

export default Dashboard;