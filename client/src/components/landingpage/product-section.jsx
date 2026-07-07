import { motion, AnimatePresence } from "framer-motion";
import { Flame, Trophy, Sparkles, Star, Heart, Copy, ArrowRight, ChevronRight, X, Ruler, ShoppingBag } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import { Button } from "@/components/ui/button";
import { useCart } from "../../context/CartContext";
import { ModernAlert } from "@/components/ui/ModernAlert"; // 

export function ProductSection() {
  const navigate = useNavigate(); 
  const [showSwipe, setShowSwipe] = useState(true);

  // Mouse Swipe Functions
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

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
    if (title.includes('Sneakers')) return ['7', '8', '9', '10', '11'];
    if (title.includes('Watch') || title.includes('Bag')) return ['Standard'];
    return ['S', 'M', 'L', 'XL', 'XXL'];
  };

  const handleAddToCart = (e, product, size = null) => {
    e.stopPropagation();

    if (selectedProduct && !size && getProductSizes(product.title).length > 1) {
      setAlertConfig({
        isOpen: true,
        type: "warning",
        title: "Wait!",
        message: "Please select a size first!",
      });
      return;
    }

    const numericPrice = parseFloat(product.price.replace('$', ''));

    const productToAdd = {
      _id: product.title, 
      name: product.title,
      price: numericPrice,
      imageUrl: product.image,
      category: "Best Seller",
      description: product.description,
      ...(size && { selectedSize: size })
    };

    addToCart(productToAdd);

    setAlertConfig({
      isOpen: true,
      type: "success",
      title: "Success!",
      message: `${product.title} Added to Cart!`,
    });

    if (selectedProduct) {
      closeModal();
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
    <section className="w-full -mt-10 md:-mt-20 py-10 md:py-10 bg-muted overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
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
          className="grid grid-cols-2 lg:flex lg:flex-nowrap gap-4 lg:gap-6 overflow-x-auto lg:snap-x lg:snap-mandatory pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
        >
          {products.map((product, index) => {
            const Icon = product.badgeIcon;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() => openModal(product)} // 👈 අර Details page යන එක අයින් කරලා Modal එක ඕපන් වෙන්න දැම්මා
                className="group flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all p-2.5 sm:p-3 cursor-pointer w-full flex-none lg:w-[280px] xl:w-[300px] lg:snap-start"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-muted mb-3 sm:mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    draggable={false}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 select-none"
                  />
                  
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 sm:px-2.5 sm:py-1 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-sm z-10">
                      {Icon && <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                      <span className="text-[9px] sm:text-[10px] font-semibold tracking-wide">{product.badge}</span>
                    </div>
                  )}

                  <button 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-zinc-500 hover:text-red-500 transition-colors shadow-sm z-10"
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-1.5 py-1 sm:px-2 sm:py-1 rounded-md flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-foreground shadow-sm z-10">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-black text-black" />
                    {product.rating}
                    <span className="text-muted-foreground font-normal ml-0.5">| {product.reviews}</span>
                  </div>

                  <button 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-1 sm:p-1.5 rounded-md text-foreground shadow-sm z-10 hover:bg-zinc-100 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-lg px-8 h-12 text-sm font-medium hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            onClick={() => navigate("/clothing")} 
          >
            Want Explore More? <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

      </div>

      {/* 👇 Product Details Modal එක */}
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
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "/Logoicon.png" }} 
                />
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                <div className="mb-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                    {selectedProduct.badge || "Best Seller"}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                  {selectedProduct.title}
                </h2>
                <div className="text-2xl font-black text-gray-900 mb-6">
                  {selectedProduct.price}
                </div>
                
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                  {selectedProduct.description}. This premium item is crafted for comfort and style. Elevate your wardrobe with this carefully designed piece.
                </p>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Select Size</span>
                    <button className="text-xs font-medium text-gray-500 hover:text-black flex items-center gap-1">
                      <Ruler size={14} /> Size Guide
                    </button>
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

      <ModernAlert 
        isOpen={alertConfig.isOpen}
        onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />

    </section>
  );
}