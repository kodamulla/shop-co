import { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingBag, Heart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

// Swiper Components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/free-mode';

export default function ClothingPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) { console.error("Error:", err); }
    };
    fetchProducts();
  }, []);

  const categories = ["Menswear", "Womenswear", "Kidswear", "Watches", "Toys", "Sneakers"];

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product);
    alert(`✅ ${product.name} Added to Cart!`); 
  };

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans">
      
      {/* 🚀 අලුත් Premium Header Section එක */}
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
            <div key={cat} className="mb-20">
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
                  320: { slidesPerView: 1.5 },
                  480: { slidesPerView: 2.2 },
                  768: { slidesPerView: 3.5 },
                  1024: { slidesPerView: 4.5 },
                  1280: { slidesPerView: 5.5 },
                }}
                className="w-full pb-10"
              >
                {categoryProducts.map((p) => (
                  <SwiperSlide key={p._id}>
                    <div className="group cursor-pointer flex flex-col h-full">
                      
                      <div className="relative aspect-[4/5] bg-gray-200 rounded-xl overflow-hidden mb-4">
                        <img 
                          src={p.imageUrl} 
                          alt={p.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80" }} 
                        />
                        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:text-red-500 shadow-sm">
                          <Heart size={18} />
                        </button>
                        
                        <button 
                          onClick={(e) => handleAddToCart(e, p)}
                          className="absolute bottom-0 left-0 w-full bg-black/85 backdrop-blur-md text-white py-3.5 text-sm font-semibold uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-black flex items-center justify-center gap-2"
                        >
                          <ShoppingBag size={16} /> Add to cart
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
    </div>
  );
}