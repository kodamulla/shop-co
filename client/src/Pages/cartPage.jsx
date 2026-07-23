import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/landingpage/navbar";
import { Footer } from "@/components/landingpage/footer";

// 1. Context එක Import කරගන්නවා
import { useCart } from "../context/CartContext"; 
// 2. අලුත් ModernAlert එක Import කරගන්නවා
import { ModernAlert } from "@/components/ui/ModernAlert";

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart(); 
  const [promoCode, setPromoCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0); // Discount එක පාලනය කරන්න අලුත් State එකක්

  // Alert එක පාලනය කරන State එක
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
    showCancel: false,
    confirmText: "Continue",
    onConfirm: null
  });

  // ගණනය කිරීම් (Calculations)
  const subtotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  const discount = subtotal * discountPercentage; // දැන් මේක Promo code එක මත තීරණය වෙනවා
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  // Item එකක් මකද්දී අහන Function එක
  const handleDeleteClick = (itemId, itemName) => {
    setAlertConfig({
      isOpen: true,
      type: "error", // රතු පාට අයිකන් එක
      title: "Remove Item",
      message: `Are you sure you want to remove ${itemName} from your cart?`,
      showCancel: true,
      confirmText: "Remove",
      onConfirm: () => {
        removeItem(itemId);
        setAlertConfig(prev => ({ ...prev, isOpen: false })); // මැකුවට පස්සේ Alert එක වහනවා
      }
    });
  };

  // Promo Code එක Apply කරන Function එක
  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SHOP20") {
      setDiscountPercentage(0.20); // 20% discount එක දෙනවා
      setAlertConfig({
        isOpen: true,
        type: "success",
        title: "Promo Applied!",
        message: "20% discount has been successfully applied to your cart.",
        showCancel: false,
        confirmText: "Awesome",
        onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    } else {
      setDiscountPercentage(0); // වැරදි නම් discount එක 0 කරනවා
      setAlertConfig({
        isOpen: true,
        type: "error",
        title: "Invalid Code",
        message: "The promo code you entered is invalid. (Hint: Try 'SHOP20')",
        showCancel: false,
        confirmText: "Try Again",
        onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/20 font-sans">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground uppercase tracking-tight">
            Your Cart
          </h1>
        </motion.div>

        {cart.length === 0 ? (
          // Empty Cart State
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-2xl border shadow-sm"
          >
            <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven't added anything to your cart yet. Discover our latest collections!
            </p>
            <Button size="lg" onClick={() => window.location.href = "/clothing"}>
              Start Shopping
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Side: Cart Items */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
              <div className="bg-card rounded-2xl border shadow-sm p-4 md:p-6 flex flex-col gap-6">
                <AnimatePresence>
                  {/* 3. cartItems වෙනුවට cart එක Map කරනවා */}
                  {cart.map((item, index) => (
                    <motion.div 
                      key={item._id} // ID එක _id විදිහට හැදුවා (Database එකට ගැලපෙන්න)
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                      className={`flex gap-4 md:gap-6 ${index !== cart.length - 1 ? "pb-6 border-b" : ""}`}
                    >
                      {/* Product Image */}
                      <div className="h-24 w-24 md:h-32 md:w-32 flex-shrink-0 bg-muted rounded-xl overflow-hidden">
                        <img 
                          src={item.imageUrl} // image වෙනුවට imageUrl පාවිච්චි කළා
                          alt={item.name} 
                          className="h-full w-full object-cover"
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80" }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-base md:text-lg text-foreground line-clamp-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Category: <span className="text-foreground">{item.category}</span>
                            </p>
                          </div>
                          <button 
                            onClick={() => handleDeleteClick(item._id, item.name)} // 👈 අලුත් Delete Function එක දැම්මා
                            className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <span className="font-bold text-lg md:text-xl text-foreground">
                            ${item.price}
                          </span>
                          
                          {/* Quantity Selector */}
                          <div className="flex items-center bg-muted rounded-full px-3 py-1.5 gap-3">
                            <button 
                              onClick={() => updateQuantity(item._id, -1)}
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-medium text-sm w-4 text-center">
                              {item.quantity || 1}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item._id, 1)}
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side: Order Summary */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 xl:col-span-4 sticky top-24"
            >
              <div className="bg-card rounded-2xl border shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 text-sm md:text-base">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Discount (-{discountPercentage * 100}%)</span>
                    <span className="font-medium text-red-500">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-foreground">${deliveryFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-4 mt-4 flex justify-between items-center">
                    <span className="text-base md:text-lg font-bold">Total</span>
                    <span className="text-xl md:text-2xl font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="flex items-center gap-3 mt-8">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Add promo code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="pl-9 h-11 bg-muted/50 border-transparent focus:border-primary"
                    />
                  </div>
                  <Button variant="secondary" className="h-11 px-5 " onClick={handleApplyPromo}>Apply</Button>
                </div>

                {/* Checkout Button */}
                <Button onClick={() => window.location.href = "/checkout"} className="w-full bg-black hover:bg-white hover:text-black hover:border hover:border-black h-14 mt-6 text-base font-semibold gap-2 rounded-xl">
                  Go to Checkout <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>

          </div>
        )}
      </main>

      <Footer />

      {/* 👇 අලුත් Modern Alert Component එක පේජ් එකේ යටින්ම දැම්මා */}
      <ModernAlert 
        isOpen={alertConfig.isOpen}
        onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={alertConfig.onConfirm || (() => setAlertConfig(prev => ({ ...prev, isOpen: false })))}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        showCancel={alertConfig.showCancel}
        confirmText={alertConfig.confirmText}
      />

    </div>
  );
}