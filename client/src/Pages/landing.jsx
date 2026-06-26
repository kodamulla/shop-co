import { Navbar } from "@/components/landingpage/navbar";
import { HeroSection } from "@/components/landingpage/hero-section";
import { Footer } from "@/components/landingpage/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
    
      <Navbar />

      {/* Hero Section */}
      <HeroSection />
      <Footer />


    </div>
  );
}