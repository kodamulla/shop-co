import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Heroo() {
  const brands = ["PREMIUM QUALITY", "EVERYDAY ESSENTIALS", "PERFECT FIT", "STREET STYLE", "COMFORT WEAR", "PREMIUM QUALITY", "EVERYDAY ESSENTIALS", "PERFECT FIT", "STREET STYLE", "COMFORT WEAR"];

  // 👇 අලුතින් එකතු කළ Scroll Function එක 👇
  const handleScrollToShop = () => {
    const section = document.getElementById('shop-section');
    if (section) {
      // උඩින් 100px ඉඩක් තියලා scroll වෙනවා (Navbar එකට යට වෙන්නේ නෑ)
      const y = section.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative w-full h-[calc(100svh-64px)] bg-white overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full h-full flex flex-col lg:flex-row">
          
          <div className="w-full h-[50%] lg:h-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start z-20 pt-2 lg:pt-0 shrink-0">
          
            <motion.h1 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 mb-2 lg:mb-3 leading-tight tracking-tight text-center lg:text-left mt-10 lg:mt-0"
            >
              Premium Clothing For Everyday Wear
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-xs sm:text-sm lg:text-lg text-gray-600  mb-2 lg:mb-4 max-w-lg leading-relaxed text-center lg:text-left"
            >
              Refresh your wardrobe with the season's most stylish picks. From casual basics to statement pieces, find everything you need right here.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex items-center justify-center lg:justify-start gap-1.5 md:gap-2 mb-4 lg:mb-6 w-full"
            >
              <span className="text-[10px] md:text-sm font-medium text-gray-600">4.7 / 5</span>
              <div className="flex text-yellow-500 gap-0.5 md:gap-1">
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
              </div>
              <span className="text-[10px] md:text-sm font-bold text-gray-900">Reviews</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <button 
                // 👇 මෙතනට අර අලුත් Function එක දැම්මා 👇
                onClick={handleScrollToShop}
                className="px-6 py-4 lg:px-8 lg:py-4 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-all shadow-lg active:scale-95 text-xs lg:text-base"
              >
                Shop New Arrivals
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-[50%] lg:h-full lg:w-1/2 flex items-end justify-center lg:justify-end relative z-10"
          >
            <div className="relative w-full h-full max-w-full lg:max-w-lg flex items-end justify-center">
              <img 
                src="/2.svg" 
                alt="Hero Image" 
                className="w-full h-full object-contain object-bottom scale-130 lg:scale-120 origin-bottom" 
              />
              
            </div>
          </motion.div>

        </div>
      </section>

      <div className="w-full bg-black overflow-hidden py-1 md:py-1 flex">
        <motion.div
          className="flex whitespace-nowrap gap-12 md:gap-24 px-6 md:px-12 items-center min-w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }} 
        >
          {brands.map((brand, index) => (
            <span 
              key={index} 
              className="text-white italic font-black text-1xl md:text-2xl tracking-widest uppercase"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </>
  );
}