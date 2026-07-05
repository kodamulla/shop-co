import { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingBag, Heart, Star, X, Ruler } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

// Navbar සහ Footer
import { Navbar } from "@/components/landingpage/navbar";
import { Footer } from "@/components/landingpage/footer";

// Swiper Components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function ClothingPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  
  // Modal එකට අදාළ States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) { console.error("Error:", err); }
    };
    fetchProducts();
  }, []);

  // 🚀 අලුත් කොටස: Home Page එකෙන් එන Hash (#) එක අඳුරගෙන ඒකට Scroll වෙනවා
  useEffect(() => {
    if (products.length > 0 && window.location.hash) {
      const id = window.location.hash.substring(1); // # ලකුණ අයින් කරනවා
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [products]);

  const categories = ["Menswear", "Womenswear", "Kidswear", "Watches", "Toys", "Sneakers"];

  const handleAddToCart = (e, product, size = null) => {
    e.stopPropagation(); 
    
    if (selectedProduct && !size && getProductSizes(product.category).length > 1) {
      alert("Please select a size first!");
      return;
    }

    const productToAdd = size ? { ...product, selectedSize: size } : product;
    addToCart(productToAdd);
    alert(`✅ ${product.name} Added to Cart!`); 
    
    if (selectedProduct) {
      closeModal();
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize(""); 
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedSize("");
  };

  const getProductSizes = (category) => {
    if (category === 'Sneakers') return ['7', '8', '9', '10', '11'];
    if (category === 'Watches' || category === 'Toys') return ['Standard'];
    return ['S', 'M', 'L', 'XL', 'XXL']; 
  };

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col font-sans relative">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-gray-950 text-white py-16 md:py-24 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-widest mb-6">
            Explore The Collection
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Discover our latest arrivals of premium quality fashion. Meticulously crafted to elevate your everyday wardrobe. Find the perfect fit for any occasion.
          </p>
        </div>

        <div className="py-12 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          {categories.map((cat) => {
            const categoryProducts = products.filter(p => p.category === cat);
            if (categoryProducts.length === 0) return null;

            return (
              // 🚀 අලුත් කොටස: id={cat} සහ scroll-mt-24 (Navbar එකෙන් වැහෙන එක නවත්වන්න)
              <div key={cat} id={cat} className="mb-20 scroll-mt-24">
                <div className="flex items-center justify-between mb-6 md:mb-8 border-b pb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-widest">{cat}</h2>
                  <button className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors">
                    View All
                  </button>
                </div>

                <Swiper
                  modules={[FreeMode]}
                  freeMode={true}
                  spaceBetween={20}
                  breakpoints={{
                    320: { slidesPerView: 2 },
                    480: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 6 },
                  }}
                  className="w-full pb-10"
                >
                  {categoryProducts.map((p) => (
                    <SwiperSlide key={p._id}>
                      <div className="group cursor-pointer flex flex-col h-full" onClick={() => openModal(p)}>
                        
                        <div className="relative aspect-[4/5] bg-gray-200 rounded-xl overflow-hidden mb-4">
                          <img 
                            src={p.imageUrl} 
                            alt={p.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            onError={(e) => { e.target.src = "/Logoicon.png" }} 
                          />
                          <button 
                            onClick={(e) => { e.stopPropagation(); }} 
                            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:text-red-500 shadow-sm"
                          >
                            <Heart size={18} />
                          </button>
                          
                          <button 
                            onClick={(e) => handleAddToCart(e, p)}
                            className="absolute bottom-0 left-0 w-full bg-black/85 backdrop-blur-md text-white py-3.5 text-sm font-semibold uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-black flex items-center justify-center gap-2"
                          >
                            <ShoppingBag size={16} /> Quick Add
                          </button>
                        </div>
                        
                        <div className="flex flex-col flex-grow px-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-tight pr-4 truncate">{p.name}</h3>
                            <span className="font-bold text-gray-900 text-sm md:text-base">${p.price}</span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1 mb-2">{p.description}</p>
                          <div className="flex items-center gap-1 mt-auto">
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium text-gray-600">4.8 <span className="text-gray-400 font-normal">(120)</span></span>
                          </div>
                        </div>

                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />

      {/* 🚀 Basic Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 md:bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={20} className="text-gray-900" />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
                <img 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "/Logoicon.png" }} 
                />
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                <div className="mb-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                    {selectedProduct.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                  {selectedProduct.name}
                </h2>
                <div className="text-2xl font-black text-gray-900 mb-6">
                  ${selectedProduct.price}
                </div>
                
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                  {selectedProduct.description} This premium item is crafted for comfort and style. Elevate your wardrobe with this carefully designed piece.
                </p>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Select Size</span>
                    <button className="text-xs font-medium text-gray-500 hover:text-black flex items-center gap-1">
                      <Ruler size={14} /> Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {getProductSizes(selectedProduct.category).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3rem] h-12 px-4 rounded-xl border text-sm font-bold transition-all duration-200 flex items-center justify-center
                          ${selectedSize === size 
                            ? 'border-black bg-black text-white shadow-md' 
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 flex gap-4">
                  <button 
                    onClick={(e) => handleAddToCart(e, selectedProduct, selectedSize)}
                    className="flex-1 bg-black text-white h-14 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} /> Add to Cart
                  </button>
                  <button className="h-14 w-14 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}