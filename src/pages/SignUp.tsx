
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Home, Check } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: searchParams.get('type') === 'landlord' ? 'landlord' : '',
    agreeToTerms: false
  });
  const navigate = useNavigate();
  const { signUp, user, loading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Nywila hazifanani');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Unalazimika kukubali masharti na taratibu');
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.fullName,
      phone: formData.phone,
      user_type: formData.userType
    });

    if (!error) {
      // Navigate landlords to dashboard, tenants stay on current page
      if (formData.userType === 'landlord') {
        // Small delay to ensure profile is created
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 1000);
      }
      
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        userType: '',
        agreeToTerms: false
      });
    }

    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-safari-50 to-serengeti-50">
      <Navigation />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <Home className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Nyumba Link</span>
            </Link>
            {searchParams.get('type') === 'landlord' ? (
              <>
                <h2 className="text-3xl font-bold text-gray-900">
                  Kuwa Mwenye Nyumba
                </h2>
                <p className="mt-2 text-gray-600">
                  Jisajili na uanze kutangaza nyumba zako leo
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-900">
                  Jiunge na Nyumba Link
                </h2>
                <p className="mt-2 text-gray-600">
                  Fungua akaunti yako ya bure leo
                </p>
              </>
            )}
          </div>

          {/* Sign up form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Jisajili</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName">Jina Kamili</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="John Mwalimu"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Barua Pepe</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="mfano@barua.com"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Nambari ya Simu</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+255712345678"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="userType">Aina ya Mtumiaji</Label>
                  <Select value={formData.userType} onValueChange={(value) => handleInputChange('userType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={
                        searchParams.get('type') === 'landlord' 
                          ? "Mwenye nyumba/Mpangisha" 
                          : "Chagua aina ya mtumiaji"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant">Mtu anayetafuta nyumba</SelectItem>
                      <SelectItem value="landlord">Mwenye nyumba/Mpangisha</SelectItem>
                    </SelectContent>
                  </Select>
                  {searchParams.get('type') === 'landlord' && (
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Umechagua kuwa mwenye nyumba
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Nywila</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Weka nywila yenye urefu wa angalau herufi 8"
                      required
                      minLength={8}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Hakikisha Nywila</Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Andika nywila tena"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="text-gray-600">
                      Nakubali{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        Masharti na Taratibu
                      </Link>{' '}
                      na{' '}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Sera ya Faragha
                      </Link>
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={!formData.agreeToTerms || isLoading}
                >
                  {isLoading ? 'Inasubiri...' : (
                    searchParams.get('type') === 'landlord' ? 'Jisajili kama Mwenye Nyumba' : 'Jisajili'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Tayari una akaunti?{' '}
                  <Link to="/signin" className="text-primary hover:underline font-medium">
                    Ingia hapa
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className={`rounded-lg p-4 ${
            searchParams.get('type') === 'landlord' ? 'bg-blue-50' : 'bg-green-50'
          }`}>
            <h3 className="font-semibold text-green-900 mb-3 flex items-center">
              <Check className="h-4 w-4 mr-2" />
              {searchParams.get('type') === 'landlord' ? 'Faida za kuwa mwenye nyumba:' : 'Faida za kujisajili:'}
            </h3>
            {searchParams.get('type') === 'landlord' ? (
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Tangaza nyumba zako kwa bure</li>
                <li>• Pata wapangaji wa haraka</li>
                <li>• Simamia matangazo yako kwa urahisi</li>
                <li>• Wasiliana na wapangaji moja kwa moja</li>
                <li>• Pata takwimu za matangazo yako</li>
              </ul>
            ) : (
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Okoa nyumba unazozipenda</li>
                <li>• Pata arifa za nyumba mpya</li>
                <li>• Wasiliana na wenye nyumba</li>
                <li>• Weka tangazo la nyumba yako</li>
                <li>• Pata msaada wa haraka</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
