import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, Plus, Minus, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function BranchesSection() {
  const branches = [
    {
      name: "Colombo",
      address: "123 Galle Road, Colombo 03",
      phone: "+94 11 234 5678",
      hours: "9:00 AM - 8:00 PM",
      image: "https://images.unsplash.com/photo-1587635293674-5c962b083321?q=80&w=800&auto=format&fit=crop",
      description: "Our flagship store located in the heart of Colombo, offering the largest collection of premium clothing and exclusive designer wear."
    },
    {
      name: "Kandy",
      address: "45 Dalada Vidiya, Kandy",
      phone: "+94 81 234 5678",
      hours: "9:30 AM - 7:30 PM",
      image: "https://images.unsplash.com/photo-1620216654763-718816c71be9?q=80&w=800&auto=format&fit=crop",
      description: "Experience modern fashion blended with cultural heritage at our Kandy branch, situated just minutes away from the Temple of the Tooth."
    },
    {
      name: "Galle",
      address: "89 Main Street, Galle Fort",
      phone: "+94 91 234 5678",
      hours: "10:00 AM - 7:00 PM",
      image: "https://images.unsplash.com/photo-1574895663701-49e0839818fa?q=80&w=800&auto=format&fit=crop",
      description: "Located inside the historic Galle Fort, this boutique store offers a curated selection of vacation wear and premium accessories."
    },
    {
      name: "Negombo",
      address: "12 Beach Road, Negombo",
      phone: "+94 31 234 5678",
      hours: "9:00 AM - 8:00 PM",
      image: "https://images.unsplash.com/photo-1586526401019-b684dc3138b7?q=80&w=800&auto=format&fit=crop",
      description: "Your go-to destination for summer collections and casual wear, perfectly located near the vibrant Negombo beach strip."
    },
    {
      name: "Kurunegala",
      address: "34 Colombo Road, Kurunegala",
      phone: "+94 37 234 5678",
      hours: "9:00 AM - 7:00 PM",
      image: "https://images.unsplash.com/photo-1590393802688-e21544621bb6?q=80&w=800&auto=format&fit=crop",
      description: "Our newest branch bringing the latest urban fashion trends to the bustling city of Kurunegala with spacious fitting rooms."
    }
  ];

  // මුලින්ම කිසිම එකක් දිගහැරිලා තියෙන්නෙ නැති වෙන්න null දෙනවා.
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    // Click කරපු එකම ආයේ Click කරොත් ඒක වැහෙනවා, නැත්නම් අලුත් එක ඇරෙනවා
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="branches" className="w-full py-16 md:py-24 bg-white overflow-hidden scroll-mt-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Our Stores
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-4 lg:px-0">
            Find the closest ShopCo experience near you. We're open all week to bring you the best fashion.
          </p>
        </motion.div>

        {/* Accordion List Section */}
        <div className="max-w-xl lg:max-w-6xl mx-auto px-4 lg:px-0">
          {branches.map((branch, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-zinc-200 last:border-0"
              >
                {/* Header (Clickable Area) */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-6 flex items-center justify-between group text-left outline-none"
                >
                  <h3 className={`text-2xl md:text-4xl font-bold transition-colors duration-300 ${isOpen ? "text-black" : "text-zinc-400 group-hover:text-black"}`}>
                    {branch.name}
                  </h3>
                  <div className={`p-2 rounded-full transition-colors duration-300 ${isOpen ? "bg-black text-white" : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-black"}`}>
                    {isOpen ? <Minus className="w-5 h-5 md:w-6 md:h-6" /> : <Plus className="w-5 h-5 md:w-6 md:h-6" />}
                  </div>
                </button>

                {/* Body (Expandable Details) */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                        
                        {/* Image */}
                        <div className="relative aspect-video md:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100">
                          <img
                            src={branch.image}
                            alt={branch.name}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex flex-col">
                          <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-6">
                            {branch.description}
                          </p>

                          <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-black shrink-0 mt-0.5" />
                              <span className="text-sm md:text-base font-medium text-zinc-800">{branch.address}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-black shrink-0" />
                              <span className="text-sm md:text-base font-medium text-zinc-800">{branch.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-black shrink-0" />
                              <span className="text-sm md:text-base font-medium text-zinc-800">{branch.hours}</span>
                            </div>
                          </div>

                          <Button className="w-full sm:w-auto self-start bg-black hover:bg-zinc-800 text-white rounded-xl h-12 px-8 font-bold flex items-center gap-2">
                            Get Directions <ArrowUpRight className="w-4 h-4" />
                          </Button>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}