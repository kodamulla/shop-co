import { useEffect } from "react"; // අලුතින් import කළා 👇
import { useLocation } from "react-router-dom"; // අලුතින් import කළා 👇

import { Navbar } from "@/components/landingpage/navbar";
import { HeroSection } from "@/components/landingpage/hero-section";
import { Footer } from "@/components/landingpage/footer";
import { CategorySection } from "@/components/landingpage/category-section";
import { ProductSection } from "@/components/landingpage/product-section";
import { NewArrivalsSection } from "@/components/landingpage/new-arrivals-section";
import { TestimonialsSection } from "@/components/landingpage/testimonials-section";

export default function LandingPage() {
  const location = useLocation(); // URL එකේ තියෙන දේවල් අල්ලගන්නවා

  
  useEffect(() => {
    if (location.hash) {
      // # ලකුණ අයින් කරලා නම විතරක් ගන්නවා (උදා: 'new-arrivals')
      const targetId = location.hash.substring(1); 
      const element = document.getElementById(targetId);
      
      if (element) {
        // React වලට Component එක Render කරන්න මිලි තත්පර 100ක පොඩි වෙලාවක් දීලා Scroll කරනවා
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // # මුකුත් නැත්නම් සාමාන්‍ය විදිහට උඩටම යනවා
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Sections */}
      <HeroSection />
      <CategorySection />
      <NewArrivalsSection />
      <ProductSection />
      <TestimonialsSection />
      
      <Footer />
    </div>
  );
}