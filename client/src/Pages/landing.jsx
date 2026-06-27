import { Navbar } from "@/components/landingpage/navbar";
import { HeroSection } from "@/components/landingpage/hero-section";
import { Footer } from "@/components/landingpage/footer";
import { CategorySection } from "@/components/landingpage/category-section";
import { ProductSection } from "@/components/landingpage/product-section";
import { NewArrivalsSection } from "@/components/landingpage/new-arrivals-section";
import { TestimonialsSection } from "@/components/landingpage/testimonials-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
    
      <Navbar />

      {/* Hero Section */}
      <HeroSection />
      <CategorySection />
      <NewArrivalsSection />
      <ProductSection />
      <TestimonialsSection />
      <Footer />


    </div>
  );
}