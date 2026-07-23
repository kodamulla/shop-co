import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, X, ShoppingBag, ShoppingCart } from "lucide-react"; 
import { useState, useRef, useEffect } from "react"; 
import { useCart } from "../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";

export function NewArrivalsSection() {
  const [showSwipe, setShowSwipe] = useState(true);

  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [selectedProduct]);

  const handleScroll = (e) => {
    if (e.currentTarget.scrollLeft > 10) {
      setShowSwipe(false);
    } else {
      setShowSwipe(true);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize("");
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedSize("");
  };

  const getProductSizes = (title) => {
    if (title.includes('Sunglasses') || title.includes('Backpack') || title.includes('Watch') || title.includes('Sneakers')) return ['Standard'];
    return ['S', 'M', 'L']; 
  };

  const handleAddToCart = (e, product, size = null) => {
    e.stopPropagation(); 

    if (!size && getProductSizes(product.title).length > 1) {
      toast.error("Please select a size first!", {
        id: "size-error", 
        duration: 3000,
        position: 'top-left',
      });
      return;
    }

    const numericPrice = parseFloat(product.price.replace('$', ''));

    const productToAdd = {
      _id: product.title, 
      name: product.title,
      price: numericPrice,
      imageUrl: product.image,
      category: "New Arrival",
      description: product.description,
      ...(size && { selectedSize: size })
    };

    addToCart(productToAdd);

    toast.success(`${product.title} Added to Cart!`, {
      id: "cart-success", 
      duration: 3000,
      position: 'top-left',
      iconTheme: {
        primary: '#22c55e', 
        secondary: '#fff',
      },
    });

    if (selectedProduct) {
      closeModal();
    }
  };

  const products = [
    {
      title: "Classic T-Shirt",
      description: "Timeless style & durable",
      price: "$21",
      originalPrice: "$65",
      discount: "(68% OFF)",
      rating: "4.7",
      reviews: "120",
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=400&auto=format&fit=crop", 
    },
    {
      title: "Retro Sunglasses",
      description: "UV protection & vintage look",
      price: "$12",
      originalPrice: "$35",
      discount: "(66% OFF)",
      rating: "4.9",
      reviews: "340",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop", 
    },
    {
      title: "Leather Backpack",
      description: "Spacious & premium quality",
      price: "$75",
      originalPrice: "$110",
      discount: "(32% OFF)",
      rating: "4.8",
      reviews: "210",
      image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=400&auto=format&fit=crop", 
    },
    {
      title: "Minimalist Beanie",
      description: "Soft & cozy for winter",
      price: "$14",
      originalPrice: "$25",
      discount: "(44% OFF)",
      rating: "4.6",
      reviews: "95",
      image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=400&auto=format&fit=crop", 
    },
    {
      title: "Oversized Cotton T-Shirt",
      description: "Breathable everyday comfort",
      price: "$13",
      originalPrice: "$20",
      discount: "(35% OFF)", 
      rating: "4.5",
      reviews: "560",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=400&auto=format&fit=crop", 
    },
    {
      title: "Classic White Sneakers",
      description: "Comfortable everyday footwear",
      price: "$85",
      originalPrice: "$120",
      discount: "(29% OFF)",
      rating: "4.8",
      reviews: "820",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Vintage Leather Watch",
      description: "Elegant and timeless design",
      price: "$60",
      originalPrice: "$110",
      discount: "(45% OFF)", 
      rating: "4.9",
      reviews: "1.2k",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=400&auto=format&fit=crop",
    }
  ];

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
    <section id="new-arrivals"  className="w-full py-10 md:py-15 bg-white overflow-hidden scroll-mt-12">
      <div className="container mx-auto md:px-6 px-4 ">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 md:mb-5 px-4 lg:px-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            New Arrivals
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Discover the latest trends and freshest styles just added to our collection. Be the first to upgrade your wardrobe!
          </p>
        </motion.div>

        <motion.div 
          className="hidden lg:flex w-full justify-end mb-4 pr-2"
          animate={{ opacity: showSwipe ? 1 : 0 }} 
          transition={{ duration: 0.3 }} 
        >
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 animate-pulse cursor-default">
            Swipe <ArrowRight className="w-4 h-4" />
          </span>
        </motion.div>

        <motion.div
          ref={carouselRef} 
          onScroll={handleScroll}
          onMouseDown={handleMouseDown} 
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ scrollBehavior: isDragging ? "auto" : "smooth" }} 
          className="grid grid-cols-2 lg:flex lg:flex-nowrap gap-3 md:gap-6 overflow-x-auto pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing px-1"
        >
          {products.map((product, index) => {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() => openModal(product)} 
                className="group relative flex flex-col w-full flex-none lg:w-[240px] xl:w-[260px] cursor-pointer"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100 mb-3 md:mb-4 shadow-sm">
                  <img
                    src={product.image}
                    alt={product.title}
                    draggable={false} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 select-none"
                  />
                  
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
                  
                  {product.badge && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-white/95 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full flex items-center gap-1 md:gap-1.5 text-[9px] md:text-[10px] font-bold text-black shadow-sm z-10">
                      {product.badgeIcon && <product.badgeIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />}
                      {product.badge}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-0 right-0 px-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(product);
                      }}
                      className="w-full bg-black/95 backdrop-blur-md text-white py-2.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-xs md:text-sm shadow-xl hover:bg-black transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Quick Add
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col px-1 flex-1">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="font-bold text-sm md:text-base text-foreground line-clamp-1 select-none">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1 bg-zinc-100 px-1.5 py-0.5 rounded-md text-[10px] md:text-xs font-bold text-foreground shrink-0">
                      <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </div>
                  </div>
                  
                  <p className="text-[10px] md:text-xs text-muted-foreground mb-2 md:mb-3 line-clamp-1 select-none">
                    {product.description}
                  </p>
                  
                  <div className="flex items-end gap-1.5 md:gap-2 select-none mt-auto">
                    <span className="font-extrabold text-base md:text-lg text-foreground leading-none">{product.price}</span>
                    <span className="text-[10px] md:text-xs text-muted-foreground line-through mb-0.5">{product.originalPrice}</span>
                    <span className="text-[9px] md:text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-md ml-auto mb-0.5">{product.discount}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

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
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "/Logoicon.png" }} 
                />
              </div>

              <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-10 lg:p-12 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                
                <div className="mb-2 md:mb-3 shrink-0">
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
                    {selectedProduct.badge || "NEW ARRIVAL"}
                  </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1 md:mb-2 leading-tight tracking-tight shrink-0">
                  {selectedProduct.title}
                </h2>
                
                {/* 👇 මෙතනින් තමයි Modal එකේ Price එකට Discount එකයි Original Price එකයි දැම්මේ 👇 */}
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6 shrink-0">
                  <span className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">
                    {selectedProduct.price}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm md:text-lg text-gray-400 line-through font-medium">
                      {selectedProduct.originalPrice}
                    </span>
                  )}
                  {selectedProduct.discount && (
                    <span className="text-[10px] md:text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">
                      {selectedProduct.discount}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-500 text-xs md:text-base leading-relaxed mb-4 md:mb-8 shrink-0 line-clamp-2 md:line-clamp-none">
                  {selectedProduct.description}. This premium item is crafted for comfort and style. Elevate your wardrobe with this carefully designed piece.
                </p>

                <div className="mb-4 md:mb-8 mt-auto shrink-0">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="text-[11px] md:text-sm font-bold text-gray-900 uppercase tracking-widest">Select Size</span>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {getProductSizes(selectedProduct.title).map((size) => (
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

                <div className="pt-1 md:pt-2 flex gap-4 shrink-0">
                  <button 
                    onClick={(e) => handleAddToCart(e, selectedProduct, selectedSize)}
                    className="w-full bg-black text-white h-12 md:h-16 rounded-lg md:rounded-xl font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 md:gap-3 shadow-lg hover:shadow-xl"
                  >
                    <ShoppingBag size={18} className="md:w-5 md:h-5" /> Add to Cart
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Toaster position="top-left" />
    </section>
  );
}