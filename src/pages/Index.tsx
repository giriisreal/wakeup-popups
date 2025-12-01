import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import PricingPreview from "@/components/PricingPreview";

const Index = () => {
  useEffect(() => {
    // Load popup embed script for demo
    const script = document.createElement('script');
    script.src = 'https://prwxjgtesrmjvuhegyte.supabase.co/functions/v1/popup-embed?id=057850a5-7a56-4d0a-8e48-014d69a97d09';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const container = document.getElementById('poopup-container-057850a5-7a56-4d0a-8e48-014d69a97d09');
      if (container) container.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <Testimonials />
        <PricingPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
