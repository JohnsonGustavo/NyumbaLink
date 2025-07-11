
/**
 * INDEX.TSX - HOMEPAGE COMPONENT
 * ==============================
 * 
 * Ukurasa wa kwanza wa Nyumba Link - Homepage for Nyumba Link
 * 
 * FUNCTIONALITY / KAZI:
 * - Displays the main landing page (Inaonyesha ukurasa wa kwanza)
 * - Contains search functionality (Ina utafutaji wa nyumba)
 * - Shows popular destinations (Inaonyesha miji maarufu)
 * - Features highlighted properties (Inaonyesha nyumba maalum)
 * - Displays platform benefits (Inaonyesha faida za mfumo)
 * 
 * COMPONENT STRUCTURE / MUUNDO WA VIPENGELE:
 * 1. Navigation - Top navigation bar (Mstari wa uongozaji juu)
 * 2. HeroSection - Main search and intro (Sehemu ya utafutaji mkuu)
 * 3. PopularDestinations - Featured cities (Miji maarufu)
 * 4. FeaturedProperties - Highlighted properties (Nyumba maalum)
 * 5. FeaturesSection - Platform benefits (Faida za mfumo)
 * 6. Footer - Bottom information (Maelezo ya chini)
 * 
 * USER FLOW / MTIRIRIKO WA MTUMIAJI:
 * Landing → Search → Browse/Details → Authentication/Favorites
 */

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PopularDestinations from "@/components/PopularDestinations";
import FeaturedProperties from "@/components/FeaturedProperties";
import Footer from "@/components/Footer";

/**
 * Homepage Component
 * Kipengele cha ukurasa wa kwanza
 * 
 * This is the main landing page that users see when they visit the site.
 * It combines multiple sections to create a comprehensive overview of the platform.
 * 
 * Huu ni ukurasa wa kwanza ambao watumiaji wanaona wanapovisimu tovuti.
 * Unaunganisha sehemu nyingi kuunda muhtasari mkamilifu wa jukwaa.
 */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Global navigation - Uongozaji wa kimataifa */}
      <Navigation />
      
      {/* Main hero section with search - Sehemu ya utafutaji mkuu */}
      <HeroSection />
      
      {/* Popular cities and destinations - Miji na maeneo maarufu */}
      <PopularDestinations />
      
      {/* Highlighted property listings - Nyumba zilizoangaziwa */}
      <FeaturedProperties />
      
      {/* Footer with additional information - Kichapo na maelezo ya ziada */}
      <Footer />
    </div>
  );
};

export default Index;
