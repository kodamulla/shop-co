import { useState } from "react";
import { 
  ShoppingCart, 
  Heart, 
  TrendingUp, 
  Star, 
  Clock, 
  Gem, 
  Tag,
  UserCircle,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "New Arrivals", icon: TrendingUp },
    { name: "Clothing", icon: Star },
    { name: "Footwear", icon: Clock },
    { name: "Accessories", icon: Gem },
    { name: "Sale", icon: Tag },
  ];

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 relative">
        
        {/* Left Section: Mobile Menu Toggle & Logo */}
        <div className="flex items-center gap-3">
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 -ml-2 bg-muted/50 hover:bg-muted text-foreground rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-xl lg:ml-20">
            <img src="/Logoicon.svg" alt="ShopCo Logo" className="h-8 w-8" />
            <span>ShopCo</span>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navLinks.map((link, index) => (
            <a key={index} href="#" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <link.icon className="h-4 w-4" /> {link.name}
            </a>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4 lg:m-20">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Heart className="h-5 w-5" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              3
            </span>
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <UserCircle className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-22 left-4 z-50 w-64 rounded-xl border bg-background p-2 shadow-lg"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors text-foreground"
                >
                  <div className="flex items-center gap-2.5">
                    <link.icon className="h-4 w-4 text-muted-foreground" />
                    {link.name}
                  </div>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}