import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart, Ruler } from "lucide-react";

export default function QuickAddModal({ selectedProduct, closeModal, handleAddToCart }) {
  const [selectedSize, setSelectedSize] = useState("");

  if (!selectedProduct) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-white rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] md:max-h-[85vh]"
        >
          <button 
            onClick={closeModal}
            className="absolute top-3 right-3 md:top-6 md:right-6 z-20 p-2 md:p-2.5 bg-white/80 backdrop-blur-md text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
          >
            <X size={18} strokeWidth={2.5} className="md:w-5 md:h-5" />
          </button>

          <div className="w-full md:w-1/2 h-[220px] sm:h-[280px] md:h-auto bg-gray-50 relative shrink-0">
            <img 
              src={selectedProduct.imageUrl} 
              alt={selectedProduct.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-10 lg:p-12 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="mb-2 md:mb-3 shrink-0">
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
                {selectedProduct.category}
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1 md:mb-2 leading-tight tracking-tight shrink-0 uppercase">
              {selectedProduct.name}
            </h2>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-3 md:mb-6 shrink-0">
              ${selectedProduct.price}
            </div>
            
            <p className="text-gray-500 text-xs md:text-base leading-relaxed mb-4 md:mb-8 shrink-0 line-clamp-2 md:line-clamp-none">
              {selectedProduct.description}
            </p>

            <div className="mb-4 md:mb-8 mt-auto shrink-0">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="text-[11px] md:text-sm font-bold text-gray-900 uppercase tracking-widest">Select Size</span>
                <button className="text-[10px] md:text-xs font-medium text-gray-500 hover:text-black flex items-center gap-1">
                  <Ruler size={14} /> Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {selectedProduct.sizes && selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 md:h-14 px-3 md:px-5 min-w-[2.5rem] md:min-w-[3rem] rounded-lg md:rounded-xl border-2 text-xs md:text-sm font-bold transition-all duration-200 flex items-center justify-center
                      ${selectedSize === size 
                        ? 'border-black bg-black text-white shadow-md scale-105' 
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-900 hover:text-gray-900'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-1 md:pt-2 flex gap-3 md:gap-4 shrink-0">
              <button 
                disabled={selectedProduct.countInStock === 0}
                onClick={(e) => handleAddToCart(e, selectedProduct, selectedSize)}
                className={`flex-1 text-white h-12 md:h-16 rounded-lg md:rounded-xl font-bold uppercase tracking-widest text-xs md:text-sm transition-all flex items-center justify-center gap-2 md:gap-3 shadow-lg 
                  ${selectedProduct.countInStock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 active:scale-[0.98] hover:shadow-xl'}`}
              >
                <ShoppingBag size={18} className="md:w-5 md:h-5" /> 
                {selectedProduct.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button className="h-12 w-12 md:h-16 md:w-16 rounded-lg md:rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all shadow-sm shrink-0">
                <Heart size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}