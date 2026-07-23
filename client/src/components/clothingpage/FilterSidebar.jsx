import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

export default function FilterSidebar({ 
  minPrice, 
  setMinPrice, 
  maxPrice, 
  setMaxPrice, 
  openSection, 
  setOpenSection 
}) {
  return (
    <aside className="w-full lg:w-[280px] shrink-0 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm lg:sticky lg:top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Filters</h2>
        <SlidersHorizontal className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {/* 📂 Category Filter */}
        <div className="border-b border-gray-100 pb-4">
          <div 
            className="flex justify-between items-center cursor-pointer py-2"
            onClick={() => setOpenSection(openSection === 'Category' ? '' : 'Category')}
          >
            <h3 className="font-bold text-sm">Category</h3>
            <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${openSection === 'Category' ? 'rotate-180' : ''}`} />
          </div>
          
          <AnimatePresence>
            {openSection === 'Category' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: "auto", opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-3.5 font-medium text-sm text-gray-600 pt-2 pb-3">
                  {["Men", "Women", "Kids", "Toys", "Watches"].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                      <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black w-4 h-4 cursor-pointer" />
                      {cat}
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 💰 Price Filter */}
        <div className="border-b border-gray-100 pb-4">
          <div 
            className="flex justify-between items-center cursor-pointer py-2"
            onClick={() => setOpenSection(openSection === 'Price' ? '' : 'Price')}
          >
            <h3 className="font-bold text-sm">Price</h3>
            <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${openSection === 'Price' ? 'rotate-180' : ''}`} />
          </div>
          
          <AnimatePresence>
            {openSection === 'Price' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: "auto", opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-4 px-1">
                  <div className="relative w-full h-1.5 bg-gray-200 rounded-full mb-6">
                    <div 
                      className="absolute h-full bg-black rounded-full"
                      style={{
                        left: `${(minPrice / 500) * 100}%`,
                        right: `${100 - (maxPrice / 500) * 100}%`
                      }}
                    />
                    <input 
                      type="range" 
                      min="0" 
                      max="500" 
                      value={minPrice}
                      onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 10))}
                      className="absolute w-full h-1.5 top-0 left-0 appearance-none bg-transparent pointer-events-none accent-black cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                    />
                    <input 
                      type="range" 
                      min="0" 
                      max="500" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 10))}
                      className="absolute w-full h-1.5 top-0 left-0 appearance-none bg-transparent pointer-events-none accent-black cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-3 text-center text-sm font-bold text-gray-800">${minPrice}</div>
                    <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-3 text-center text-sm font-bold text-gray-700">${maxPrice}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 📏 Size Filter */}
        <div className="pb-2">
          <div 
            className="flex justify-between items-center cursor-pointer py-2"
            onClick={() => setOpenSection(openSection === 'Size' ? '' : 'Size')}
          >
            <h3 className="font-bold text-sm">Size</h3>
            <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${openSection === 'Size' ? 'rotate-180' : ''}`} />
          </div>
          
          <AnimatePresence>
            {openSection === 'Size' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: "auto", opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2.5 pt-3 pb-2">
                  {["Small", "Medium", "Large", "XL"].map((sz) => (
                    <button 
                      key={sz}
                      className="px-4 py-2 bg-gray-50 border border-gray-100 text-gray-700 rounded-full text-xs font-bold hover:bg-black hover:text-white transition-colors"
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button className="flex-1 py-3.5 bg-white border-2 border-gray-100 text-gray-900 rounded-xl text-sm font-bold hover:border-gray-300 transition-colors">Reset</button>
        <button className="flex-1 py-3.5 bg-black text-white rounded-xl text-sm font-bold shadow-md hover:bg-gray-800 transition-colors">Apply Filter</button>
      </div>
    </aside>
  );
}