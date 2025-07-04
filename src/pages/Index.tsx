
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  // Sample featured properties
  const featuredProperties = [
    {
      id: '1',
      title: 'Nyumba ya Kisasa Mikocheni',
      description: 'Nyumba nzuri ya vyumba 3 na jiko la kisasa. Ina bustani ndogo na nafasi ya gari.',
      price: 800000,
      location: 'Mikocheni, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital', 'market'],
      landlord: { name: 'Mwalimu John', phone: '+255712345678', email: 'john@example.com' }
    },
    {
      id: '2',
      title: 'Apartmenti ya Ufukweni',
      description: 'Chumba kimoja na jiko. Karibu na barabara kuu na maktaba ya umma.',
      price: 400000,
      location: 'Mwananyamala, Dar es Salaam',
      images: ['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: false },
      nearbyServices: ['school', 'market'],
      landlord: { name: 'Bi. Mary', phone: '+255756789012', email: 'mary@example.com' }
    },
    {
      id: '3',
      title: 'Nyumba ya Familia Arusha',
      description: 'Nyumba kubwa ya vyumba 4 na bustani. Mazingira mazuri na hewa safi.',
      price: 1200000,
      location: 'Njiro, Arusha',
      images: ['https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop'],
      utilities: { electricity: true, water: true },
      nearbyServices: ['school', 'hospital'],
      landlord: { name: 'Mzee Hassan', phone: '+255678901234', email: 'hassan@example.com' }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Properties Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nyumba za Maarufu
            </h2>
            <p className="text-xl text-gray-600">
              Angalia baadhi ya nyumba zinazopendwa zaidi na wateja wetu
            </p>
          </div>

          {/* Properties grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          {/* View all button */}
          <div className="text-center">
            <Link to="/browse">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Angalia Nyumba Zote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-kilimanjaro-50 to-safari-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Maoni ya Wateja Wetu
            </h2>
            <p className="text-xl text-gray-600">
              Soma jinsi Nyumba Link inavyowasaidia Watanzania kupata nyumba zao za ndoto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Nilipata nyumba yangu ya ndoto kwa haraka sana. Huduma ni nzuri na bei ni za kawaida. Asante Nyumba Link!"
              </p>
              <div className="font-semibold text-gray-900">- Amina Hassan, Dar es Salaam</div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Kama mwenye nyumba, nimepata wapangaji wazuri kupitia Nyumba Link. Mchakato ni rahisi sana."
              </p>
              <div className="font-semibold text-gray-900">- John Mwalimu, Mwanza</div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Nyumba Link ni bora! Nimesaidia rafiki zangu wengi kupata nyumba nzuri kwa bei nzuri."
              </p>
              <div className="font-semibold text-gray-900">- Grace Mollel, Arusha</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-kilimanjaro-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Nyumba Link</h3>
              <p className="text-gray-300 mb-4">
                Tunawaongoza Watanzania kupata nyumba za ndoto zao. 
                Jisajili leo na uanze safari yako ya kupata makazi mazuri.
              </p>
              <div className="text-sm text-gray-400">
                © 2024 Nyumba Link. Haki zote zimehifadhiwa.
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold mb-4">Viungo vya Haraka</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/browse" className="hover:text-white transition-colors">Tazama Nyumba</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Weka Tangazo</Link></li>
                <li><Link to="/favorites" className="hover:text-white transition-colors">Nyumba Pendwa</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Wasiliana Nasi</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Wasiliana</h4>
              <ul className="space-y-2 text-gray-300">
                <li>+255 123 456 789</li>
                <li>info@nyumbalink.co.tz</li>
                <li>Dar es Salaam, Tanzania</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
