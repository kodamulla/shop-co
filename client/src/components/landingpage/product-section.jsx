import { motion } from "framer-motion";
import { Flame, Trophy, Sparkles, Star, Heart, Copy, ArrowRight } from "lucide-react";
import { useState } from "react"; // අලුතින් useState import කළා 👇

export function ProductSection() {
  // Swipe Indicator එක පෙන්වන්න සහ හංගන්න State එකක් 👇
  const [showSwipe, setShowSwipe] = useState(true);

  // Scroll කරද්දී වැඩ කරන Function එක 👇
  const handleScroll = (e) => {
    // Scroll කරලා තියෙන දුර 10px ට වඩා වැඩි නම් Swipe එක හංගන්න (false)
    if (e.currentTarget.scrollLeft > 10) {
      setShowSwipe(false);
    } else {
      // ආයෙත් මුලටම ආවම (scroll දුර 0 වුණාම) Swipe එක පෙන්නන්න (true)
      setShowSwipe(true);
    }
  };

  const products = [
    {
      badge: "Trending",
      badgeIcon: Flame,
      title: "Classic White Sneakers",
      description: "Comfortable everyday wear",
      price: "$29",
      originalPrice: "$49",
      discount: "(50% OFF)",
      rating: "4.5",
      reviews: "1.2k",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop", 
    },
    {
      badge: "Bestseller",
      badgeIcon: Trophy,
      title: "Urban Sport Jacket",
      description: "Lightweight & water-resistant",
      price: "$47",
      originalPrice: "$70",
      discount: "(33% OFF)",
      rating: "4.8",
      reviews: "850",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&auto=format&fit=crop", 
    },
    {
      badge: null,
      badgeIcon: null,
      title: "Casual Denim Shirt",
      description: "100% cotton comfort",
      price: "$23",
      originalPrice: "$35",
      discount: "(33% OFF)",
      rating: "4.3",
      reviews: "620",
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400&auto=format&fit=crop", 
    },
    {
      badge: "New Arrival",
      badgeIcon: Sparkles,
      title: "Premium Wool Sweater",
      description: "Warm & stylish design",
      price: "$52",
      originalPrice: "$70",
      discount: "(25% OFF)",
      rating: "4.6",
      reviews: "450",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=400&auto=format&fit=crop", 
    },
    {
      badge: "Trending",
      badgeIcon: Flame,
      title: "Luxury Black Watch",
      description: "Elegant & waterproof",
      price: "$199",
      originalPrice: "$250",
      discount: "(20% OFF)",
      rating: "4.9",
      reviews: "2.1k",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop", 
    },
    {
      badge: "Bestseller",
      badgeIcon: Trophy,
      title: "Leather Weekend Bag",
      description: "Premium travel companion",
      price: "$89",
      originalPrice: "$120",
      discount: "(25% OFF)",
      rating: "4.7",
      reviews: "930",
      image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=400&auto=format&fit=crop", 
    }
  ];

  // Animations සැකසුම්
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="w-full -mt-10 md:-mt-10 py-10 md:py-15 bg-muted overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Heading සහ Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 md:mb-5"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Today's Best Deals For You!
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Don't miss out on these exclusive offers! Upgrade your style with our top-rated products at unbeatable prices.
          </p>
        </motion.div>

        {/* Swipe Indicator එක (Fade in/out වෙන විදිහට හැදුවා) 👇 */}
        <motion.div 
          className="hidden lg:flex w-full justify-end mb-4 pr-2"
          animate={{ opacity: showSwipe ? 1 : 0 }} // scroll එක අනුව පේනවා/නොපෙනෙනවා
          transition={{ duration: 0.3 }} // මෘදුව මැකිලා යන වේගය
        >
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 animate-pulse cursor-default">
            Swipe <ArrowRight className="w-4 h-4" />
          </span>
        </motion.div>

        {/* Product Grid / Carousel */}
        <motion.div
          onScroll={handleScroll} // Scroll කරද්දී අර function එක වැඩ කරන්න මෙතනට දැම්මා 👇
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 lg:flex lg:flex-nowrap gap-4 lg:gap-6 overflow-x-auto lg:snap-x lg:snap-mandatory pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {products.map((product, index) => {
            const Icon = product.badgeIcon;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all p-2.5 sm:p-3 cursor-pointer w-full flex-none lg:w-[280px] xl:w-[300px] lg:snap-start"
              >
                {/* පින්තූරය සහ ඒ උඩ තියෙන Icons */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-muted mb-3 sm:mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Top Left Badge */}
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 sm:px-2.5 sm:py-1 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-sm z-10">
                      {Icon && <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                      <span className="text-[9px] sm:text-[10px] font-semibold tracking-wide">{product.badge}</span>
                    </div>
                  )}

                  {/* Top Right Heart Icon */}
                  <button className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-zinc-500 hover:text-red-500 transition-colors shadow-sm z-10">
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  {/* Bottom Left Rating */}
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-1.5 py-1 sm:px-2 sm:py-1 rounded-md flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-foreground shadow-sm z-10">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-black text-black" />
                    {product.rating}
                    <span className="text-muted-foreground font-normal ml-0.5">| {product.reviews}</span>
                  </div>

                  {/* Bottom Right Icon */}
                  <button className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-1 sm:p-1.5 rounded-md text-foreground shadow-sm z-10 hover:bg-zinc-100 transition-colors">
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
                
                {/* Product විස්තර */}
                <div className="flex flex-col px-1 flex-1">
                  <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1 line-clamp-1">
                    {product.description}
                  </p>
                  
                  {/* මිල ගණන් පේළිය */}
                  <div className="mt-2 sm:mt-2.5 flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-0">
                    <span className="font-bold text-sm sm:text-base text-foreground">{product.price}</span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground line-through">{product.originalPrice}</span>
                    <span className="text-[10px] sm:text-xs font-semibold text-foreground">{product.discount}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}