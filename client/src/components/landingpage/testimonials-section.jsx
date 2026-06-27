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

  // ලංකාවට ගැළපෙන Reviews 3ක්
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
  ];

  // Animations
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
    <section className="w-full py-10 md:py-15 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Heading & Subheading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
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
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-15 transition-all duration-500"
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

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col justify-between rounded-2xl border bg-card text-card-foreground p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-muted-foreground/30 mb-6 rotate-180" />
                {/* Review Text */}
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>
              </div>
              
              {/* User Info */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-foreground">
                  {testimonial.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground text-sm md:text-base">
                    {testimonial.name}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {testimonial.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}