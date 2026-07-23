import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { 
  SlidersHorizontal, ChevronDown, Star, ShoppingBag, ShoppingCart, X, Heart, Ruler 
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { Heroo } from "@/components/clothingpage/hero";

// Navbar සහ Footer
import { Navbar } from "@/components/landingpage/navbar";
import { Footer } from "@/components/landingpage/footer";
import { ModernAlert } from "@/components/ui/ModernAlert";

export default function ClothingPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(400);

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [openSection, setOpenSection] = useState("Category");

  // Alert Config
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) { 
        console.error("Error fetching products:", err); 
        // Testing සදහා Dummy Data
        setProducts([
          { _id: "1", name: "GRADIENT GRAPHIC T-SHIRT", description: "Premium cotton blend everyday t-shirt.", price: 145, category: "Men", sizes: ["Small", "Medium", "Large"], imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400&auto=format&fit=crop", countInStock: 15 },
          { _id: "2", name: "SKINNY FIT JEANS", description: "Comfortable stretch denim for all-day wear.", price: 240, category: "Men", sizes: ["Medium", "Large"], imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&auto=format&fit=crop", countInStock: 5 },
          { _id: "3", name: "URBAN SPORT JACKET", description: "Lightweight & water-resistant jacket.", price: 320, category: "Women", sizes: ["Small", "Medium"], imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&auto=format&fit=crop", countInStock: 20 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Modal Scroll Lock
  useEffect(() => {
    if (selectedProduct) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProduct]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize(""); 
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedSize("");
  };

  const handleAddToCart = (e, product, size = null) => {
    e.stopPropagation(); 
    
    if (!size && product.sizes && product.sizes.length > 0) {
      setAlertConfig({
        isOpen: true,
        type: "warning",
        title: "Wait!",
        message: "Please select a size first!",
      });
      return;
    }

    const productToAdd = size ? { ...product, selectedSize: size } : product;
    addToCart(productToAdd);
    
    setAlertConfig({
      isOpen: true,
      type: "success",
      title: "Success!",
      message: `${product.name} Added to Cart!`,
    });
    
    if (selectedProduct) {
      closeModal();
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col font-sans text-gray-900">
      <Navbar />
      <Heroo />
      
      <main className="flex-1 flex flex-col pb-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 pt-10 flex flex-col lg:flex-row gap-8 items-start">
          
          {/* 🎛️ Left Sidebar Filters */}
          <aside className="w-full lg:w-[280px] shrink-0 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
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

              {/* 💰 Price Filter (Dual Range Slider - image_76921f.png වගේමයි) */}
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
                        {/* Dual Slider Container */}
                        <div className="relative w-full h-1.5 bg-gray-200 rounded-full mb-6">
                          
                          {/* Active Fill Track */}
                          <div 
                            className="absolute h-full bg-black rounded-full"
                            style={{
                              left: `${((minPrice - 50) / 350) * 100}%`,
                              right: `${100 - ((maxPrice - 50) / 350) * 100}%`
                            }}
                          />
                          
                          {/* Min Price Slider Input */}
                          <input 
                            type="range" 
                            min="50" 
                            max="400" 
                            value={minPrice}
                            onChange={(e) => {
                              const value = Math.min(Number(e.target.value), maxPrice - 10);
                              setMinPrice(value);
                            }}
                            className="absolute w-full h-1.5 top-0 left-0 appearance-none bg-transparent pointer-events-none accent-black cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                          />
                          
                          {/* Max Price Slider Input */}
                          <input 
                            type="range" 
                            min="50" 
                            max="400" 
                            value={maxPrice}
                            onChange={(e) => {
                              const value = Math.max(Number(e.target.value), minPrice + 10);
                              setMaxPrice(value);
                            }}
                            className="absolute w-full h-1.5 top-0 left-0 appearance-none bg-transparent pointer-events-none accent-black cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                          />
                        </div>

                        {/* Price Display Boxes (image_76921f.png විදිහටමයි) */}
                        <div className="flex gap-3">
                          <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-3 text-center text-sm font-bold text-gray-800">
                            ${minPrice}
                          </div>
                          <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-3 text-center text-sm font-bold text-gray-700">
                            ${maxPrice}
                          </div>
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

          {/* 🛍️ Right Content - Product Grid */}
          <div className="flex-1 flex flex-col">
            
            {/* 📋 Search & Sort ඉවත් කර සකස් කළ සරල තීරුව */}
            <div className="flex items-center justify-between mb-6 px-1">
              <span className="text-sm text-gray-500 font-medium">Showing {products.length} products</span>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="m-auto flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => openModal(product)} 
                    className="group relative flex flex-col w-full bg-white rounded-2xl cursor-pointer"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100 mb-3 shadow-sm">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        draggable={false}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 select-none"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
                      
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-black shadow-sm z-10 uppercase tracking-wider">
                        {product.category}
                      </div>

                      <div className="absolute bottom-3 left-0 right-0 px-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(product);
                          }}
                          className="w-full bg-black/95 backdrop-blur-md text-white py-2.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm shadow-xl hover:bg-gray-900 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" /> Quick Add
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col px-1 flex-1">
                      <div className="flex items-center gap-1 bg-yellow-50 w-max px-1.5 py-0.5 rounded-md text-[10px] font-bold text-yellow-600 mb-1.5">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        4.5/5
                      </div>
                      
                      <h3 className="font-extrabold text-sm md:text-[15px] text-gray-900 uppercase tracking-tight line-clamp-1 select-none mb-1">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-end gap-2 select-none mt-auto">
                        <span className="font-black text-lg text-gray-900 leading-none">${product.price}</span>
                        {product.countInStock > 0 && product.countInStock <= 10 && (
                          <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-md ml-auto">
                            Only {product.countInStock} left
                          </span>
                        )}
                        {product.countInStock === 0 && (
                          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md ml-auto">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {!isLoading && <Footer />}

      {/* Quick Add Modal */}
      <AnimatePresence>
        {selectedProduct && (
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
        )}
      </AnimatePresence>

      <ModernAlert 
        isOpen={alertConfig.isOpen}
        onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </div>
  );
}