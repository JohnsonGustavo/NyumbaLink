
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PopularDestinations from "@/components/PopularDestinations";
import FeaturedProperties from "@/components/FeaturedProperties";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <PopularDestinations />
      <FeaturedProperties />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
