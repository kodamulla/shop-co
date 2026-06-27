import { motion } from "framer-motion";

export function CategorySection() {
  const categories = [
    { 
      name: "Menswear", 
      image: "man.png" 
    },
    { 
      name: "Womenswear", 
      image: "woman.png" 
    },
    { 
      name: "Kidswear", 
      image: "/girll.png" 
    },
    { 
      name: "Watches", 
      image: "/watch.png" 
    },
    { 
      name: "Toys", 
      image: "/toy.png" 
    },
    { 
      name: "Sneakers", 
      image: "/snikearss.png" 
    }, // කළු පසුබිමක් සහිත සපත්තු (Sneakers)
  ];

  // Animations සැකසුම්
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // එකින් එක පමාවෙලා එන්න
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="w-full py-10 md:py-15 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Heading එක උඩට මතුවෙන Animation එක */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Explore Popular Categories
          </h2>
          {/* අලුතින් එකතු කළ ඡේදය මෙතන තියෙනවා 👇 */}
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Browse through our carefully curated collections designed to match your unique style and everyday needs. Find exactly what you're looking for.
          </p>
        </motion.div>

        {/* Categories Grid (රවුම් ටික) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-12"
        >
          {categories.map((category, index) => (
            <motion.a 
              key={index}
              href="#"
              variants={itemVariants}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* රවුම් පින්තූරය */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-[140px] lg:h-[140px] rounded-full overflow-hidden mb-4 bg-muted shadow-sm group-hover:shadow-md transition-shadow">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  // Grayscale සහ Hover scale අයින් කළා. දැන් හැමවෙලේම පාටින් තියෙනවා.
                  className="object-cover w-full h-full"
                />
              </div>
              
              {/* යටින් තියෙන නම */}
              <span className="text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors text-center">
                {category.name}
              </span>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}