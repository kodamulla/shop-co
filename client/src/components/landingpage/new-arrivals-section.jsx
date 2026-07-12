import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Zap, ArrowRight, X, ShoppingBag, ShoppingCart } from "lucide-react"; 
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
    };
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
    if (title.includes('Sunglasses') || title.includes('Backpack')) return ['Standard'];
    return ['S', 'M', 'L']; 
  };

  const handleAddToCart = (e, product, size = null) => {
    e.stopPropagation(); 

    if (!size && getProductSizes(product.title).length > 1) {
      toast.error("Please select a size first!", {
        id: "size-error", // 👈 මේ id එක නිසා එකපාර ගොඩක් error පේන්නේ නෑ
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
      id: "cart-success", // 👈 මේ id එක නිසා එකපාර ගොඩක් success පේන්නේ නෑ
      duration: 3000,
      position: 'top-left',
      iconTheme: {
        primary: '#22c55e', // 👈 කළු පාට වෙනුවට Tailwind Green (කොළ පාට) දැම්මා
        secondary: '#fff',
      },
    });

    if (selectedProduct) {
      closeModal();
    }
  };

  const products = [
    {
      badge: "New",
      badgeIcon: Sparkles,
      title: "Classic Denim Jacket",
      description: "Timeless style & durable",
      price: "$59",
      originalPrice: "$85",
      discount: "(30% OFF)",
      rating: "4.7",
      reviews: "120",
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=400&auto=format&fit=crop", 
    },
    {
      badge: "Trending",
      badgeIcon: Zap,
      title: "Retro Sunglasses",
      description: "UV protection & vintage look",
      price: "$19",
      originalPrice: "$35",
      discount: "(45% OFF)",
      rating: "4.9",
      reviews: "340",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop", 
    },
    {
      badge: null,
      badgeIcon: null,
      title: "Leather Backpack",
      description: "Spacious & premium quality",
      price: "$75",
      originalPrice: "$110",
      discount: "(31% OFF)",
      rating: "4.8",
      reviews: "210",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop", 
    },
    {
      badge: "New",
      badgeIcon: Sparkles,
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
      badge: "Hot",
      badgeIcon: Zap,
      title: "Oversized Cotton T-Shirt",
      description: "Breathable everyday comfort",
      price: "$22",
      originalPrice: "$30",
      discount: "(26% OFF)",
      rating: "4.5",
      reviews: "560",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=400&auto=format&fit=crop", 
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
      <div className="container mx-auto px-4 md:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 md:mb-5"
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
          className="grid grid-cols-2 gap-4 lg:flex lg:flex-nowrap lg:overflow-x-auto lg:snap-x lg:snap-mandatory lg:gap-6 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
        >
          {products.map((product, index) => {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() => openModal(product)} 
                className="group flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all p-2.5 sm:p-3 w-full flex-none lg:w-[280px] xl:w-[300px] lg:snap-start cursor-pointer"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-muted mb-3 sm:mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    draggable={false} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 select-none"
                  />
                  
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-zinc-500 hover:text-black transition-colors shadow-sm z-10"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-1.5 py-1 sm:px-2 sm:py-1 rounded-md flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-foreground shadow-sm z-10">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-black text-black" />
                    {product.rating}
                    <span className="text-muted-foreground font-normal ml-0.5">| {product.reviews}</span>
                  </div>
                </div>
                
                <div className="flex flex-col px-1 flex-1">
                  <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-1 select-none">
                    {product.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1 line-clamp-1 select-none">
                    {product.description}
                  </p>
                  
                  <div className="mt-2 sm:mt-2.5 flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-0 select-none">
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
              className="relative w-full max-w-3xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={closeModal}
                className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-2 bg-white/90 md:bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shadow-sm md:shadow-none"
              >
                <X size={20} className="text-gray-900" />
              </button>

              <div className="w-full md:w-1/2 h-52 sm:h-64 md:h-auto bg-gray-100 relative shrink-0">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "/Logoicon.png" }} 
                />
              </div>

              <div className="w-full md:w-1/2 p-5 md:p-8 flex flex-col overflow-y-auto">
                <div className="mb-2 shrink-0">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                    {selectedProduct.badge || "New Arrival"}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight shrink-0">
                  {selectedProduct.title}
                </h2>
                <div className="text-2xl font-black text-gray-900 mb-4 md:mb-6 shrink-0">
                  {selectedProduct.price}
                </div>
                
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8 shrink-0">
                  {selectedProduct.description}. This premium item is crafted for comfort and style. Elevate your wardrobe with this carefully designed piece.
                </p>

                <div className="mb-6 md:mb-8 shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Select Size</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {getProductSizes(selectedProduct.title).map((size) => (
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

                <div className="mt-auto pt-2 md:pt-4 flex gap-4 shrink-0">
                  <button 
                    onClick={(e) => handleAddToCart(e, selectedProduct, selectedSize)}
                    className="flex-1 bg-black text-white h-14 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} /> Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toaster Position එක කලින් top-left දුන්නා වගේම තියෙනවා */}
      <Toaster position="top-left" />

    </section>
  );
}