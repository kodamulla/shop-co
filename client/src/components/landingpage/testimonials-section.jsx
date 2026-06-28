import { motion } from "framer-motion";
import { 
  Quote, 
  Activity, 
  CircleDashed, 
  Diamond, 
  Feather, 
  Hexagon, 
  Triangle, 
  Box 
} from "lucide-react";

export function TestimonialsSection() {
  // Brands 7 ක ලැයිස්තුව
  const brands = [
    { name: "Nike", icon: Activity },
    { name: "Rolex", icon: CircleDashed },
    { name: "Dior", icon: Diamond },
    { name: "Muse", icon: Feather },
    { name: "Gucci", icon: Hexagon },
    { name: "Prada", icon: Triangle },
    { name: "Zara", icon: Box },
  ];

  // ලංකාවට ගැළපෙන Reviews 6ක් (අලුතින් 3ක් එකතු කළා)
  const testimonials = [
    {
      quote: "The quality of the clothes is simply amazing. The delivery to Kandy was super fast, and the customer service is highly responsive. Definitely my go-to fashion store now!",
      name: "Kavindi Perera",
      title: "Fashion Enthusiast, Kandy",
      initials: "KP",
    },
    {
      quote: "I ordered a jacket and some sneakers, and they look exactly like the pictures. Premium materials and perfect fitting. Highly recommend ShopCo to anyone in Sri Lanka.",
      name: "Nuwan Silva",
      title: "Software Engineer, Colombo",
      initials: "NS",
    },
    {
      quote: "Finding original, high-quality brands locally used to be a hassle. ShopCo made it so effortless with their smooth ordering process and beautiful packaging.",
      name: "Dinithi Fernando",
      title: "Entrepreneur, Galle",
      initials: "DF",
    },
    {
      quote: "Absolutely love the fit and fabric! The delivery to Kurunegala was surprisingly quick. The sizing chart is very accurate. Will definitely buy again.",
      name: "Saduni Bandara",
      title: "Teacher, Kurunegala",
      initials: "SB",
    },
    {
      quote: "The streetwear collection is fire. Great prices and the sizes are exactly as mentioned on the site. Best online shopping experience I've had.",
      name: "Tharindu De Silva",
      title: "Graphic Designer, Negombo",
      initials: "TD",
    },
    {
      quote: "Customer support is top-notch. I had to exchange a shirt for a different size, and they handled it perfectly within 2 days with zero hassle.",
      name: "Amila Perera",
      title: "Banker, Matara",
      initials: "AP",
    },
  ];

  // Brands වල Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="w-full py-16 md:py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Heading & Subheading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Why Fashion Lovers Choose ShopCo
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            See how our customers across Sri Lanka are elevating their everyday style with our premium collections and trusted brands.
          </p>
        </motion.div>

        {/* Brands Logo Cloud */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mb-16 transition-all duration-500"
        >
          {brands.map((brand, index) => {
            const Icon = brand.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors cursor-default"
              >
                <Icon className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-lg md:text-xl font-bold tracking-tight">{brand.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Testimonials Looping Marquee */}
      <div className="relative w-full overflow-hidden py-4">
        {/* වම් සහ දකුණු පැතිවල අඳුරු වෙන Gradient Effect එක */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        {/* පැත්තට යන Animation එක */}
        <motion.div
          className="flex gap-6 w-max"
          // මේකෙන් තමයි Loop වෙන්න හදලා තියෙන්නේ 👇
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35, // වේගය වෙනස් කරන්න ඕනේ නම් මේ ගාණ අඩු/වැඩි කරන්න
            repeat: Infinity,
          }}
        >
          {/* Reviews ටික නොකඩවා පෙන්නන්න Array එක දෙපාරක් Render කරනවා */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              // කාඩ් එකේ පළල Fixed කරලා තියෙන්නේ Squish වෙන්නේ නැති වෙන්න 👇
              className="w-[280px] md:w-[350px] lg:w-[400px] flex-shrink-0 flex flex-col justify-between rounded-2xl border bg-card text-card-foreground p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Quote Icon */}
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground/30 mb-6 rotate-180" />
                {/* Review Text */}
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 line-clamp-4">
                  "{testimonial.quote}"
                </p>
              </div>
              
              {/* User Info */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center text-xs md:text-sm font-bold text-foreground">
                  {testimonial.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground text-sm md:text-base line-clamp-1">
                    {testimonial.name}
                  </span>
                  <span className="text-[11px] md:text-xs text-muted-foreground line-clamp-1">
                    {testimonial.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}