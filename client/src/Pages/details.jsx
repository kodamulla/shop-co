import { Navbar } from "@/components/landingpage/navbar";
import { Footer } from "@/components/landingpage/footer";
import { FAQSection } from "@/components/detailspage/faq-section";
import { ContactUsSection } from "@/components/detailspage/contact-us-section";

export default function DetailsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 md:px-6 py-0 md:py-10 max-w-7xl">
        {/* 1. FAQ Section */}
        <FAQSection />

        {/* 2. Contact Us Section */}
        <ContactUsSection />

      </main>

      <Footer />
    </div>
  );
}