import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Heroo() {
  return (
    // min-h-[calc(100vh-64px)] යොදා Navbar එකට පහළින් ඉතිරි කොටස ලබා ගනී
    <section className="relative w-full min-h-[calc(100vh-64px)] bg-white py-12 px-6 flex flex-col justify-between overflow-hidden">
      
      {/* Content Container */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center flex-grow">
        
        {/* වම් පැත්තේ පෙළ (Text) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-20"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-medium text-gray-600">Great 4.7 / 5</span>
            <div className="flex text-green-500">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="text-sm font-bold text-gray-900">Trustpilot</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            Expert High Quality Blank Supplier
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
            Feel good, look good in your own clothes. We help you design, measure and fit the best look.
          </p>
          
          <button className="px-8 py-4 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-all shadow-lg active:scale-95">
            All Blanks
          </button>
        </motion.div>
      </div>

      {/* පින්තූරය සහ Shadow එක (Hero Section එකේ පහළටම යොමු කර ඇත) */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 left-0 w-full flex justify-center z-10"
      >
        <div className="relative w-full max-w-5xl">
          {/* පින්තූරය */}
          <img 
            src="/2.svg" // මෙතනට ඔයාගේ පින්තූරේ path එක දෙන්න
            alt="Hero Image" 
            className="w-full h-auto object-contain" 
          />
          
          {/* පින්තූරයේ පහළ සුදු පැහැති Shadow එක (White Fade) */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>
      </motion.div>

    </section>
  );
}