
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Shield, Heart, MapPin, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: 'Tafuta Kwa Urahisi',
      titleEn: 'Easy Search',
      description: 'Tumia filters za kisasa kupata nyumba inayokufaa. Chuja kwa bei, mahali, na huduma zinazopatikana.',
      descriptionEn: 'Use modern filters to find your perfect home. Filter by price, location, and available amenities.'
    },
    {
      icon: Shield,
      title: 'Usalama wa Juu',
      titleEn: 'High Security',
      description: 'Mamiliki wote wamehakikiwa na maelezo yao ni ya kweli. Hakuna wasiwasi wa ufujo au udanganyifu.',
      descriptionEn: 'All landlords are verified and their information is authentic. No worries about fraud or deception.'
    },
    {
      icon: Heart,
      title: 'Hifadhi Pendwa',
      titleEn: 'Save Favorites',
      description: 'Hifadhi nyumba unazozipenda na uziangalie baadaye. Linganisha bei na mazingira kwa urahisi.',
      descriptionEn: 'Save the houses you love and review them later. Compare prices and environments easily.'
    },
    {
      icon: MapPin,
      title: 'Ramani za Kisasa',
      titleEn: 'Modern Maps',
      description: 'Ona mahali halisi pa nyumba na umbali wa huduma kama shule, hospitali, na maduka.',
      descriptionEn: 'See the exact location of houses and distance to services like schools, hospitals, and shops.'
    },
    {
      icon: Zap,
      title: 'Huduma za Msingi',
      titleEn: 'Basic Utilities',
      description: 'Jua kama nyumba ina umeme, maji, na huduma nyingine muhimu kabla ya kuhamia.',
      descriptionEn: 'Know if the house has electricity, water, and other essential services before moving.'
    },
    {
      icon: Users,
      title: 'Jamii Kubwa',
      titleEn: 'Large Community',
      description: 'Jiunge na jamii ya Watanzania wanaotafuta na kutoa nyumba. Ushauri na maoni ya kweli.',
      descriptionEn: 'Join a community of Tanzanians looking for and offering houses. Real advice and opinions.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-safari-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kwa Nini Uchague Nyumba Link?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tunatoa huduma bora za kutafuta na kutoa nyumba kote Tanzania. 
            Jisajili leo na uanze safari yako ya kupata nyumba ya ndoto.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-serengeti-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Tayari Kuanza? Jisajili Sasa!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Jiunge na elfu za Watanzania wanaotumia Nyumba Link kupata nyumba zao za ndoto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block text-center"
              >
                Jisajili Kama Mwenye Nyumba
              </Link>
              <Link 
                to="/browse" 
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors inline-block text-center"
              >
                Tafuta Nyumba
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
