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

export default function CartPage() {
  // 2. Dummy data වෙනුවට Context එකෙන් cart එකයි function ටිකයි ගන්නවා
  const { cart, updateQuantity, removeItem } = useCart(); 
  const [promoCode, setPromoCode] = useState("");

  // ගණනය කිරීම් (Calculations)
  const subtotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  const discount = subtotal * 0.2; // 20% Discount
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

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
                            onClick={() => removeItem(item._id)}
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
                    <span>Discount (-20%)</span>
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
                  <Button variant="secondary" className="h-11 px-6">Apply</Button>
                </div>

                {/* Checkout Button */}
                <Button onClick={() => window.location.href = "/checkout"} className="w-full h-14 mt-6 text-base font-semibold gap-2 rounded-xl">
                  Go to Checkout <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}