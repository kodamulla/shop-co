import { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  TrendingUp, 
  Star, 
  Phone, 
  Menu,
  X,
  LogIn 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "New Arrivals", href: "#new-arrivals", icon: TrendingUp },
    { name: "Clothing", href: "/products", icon: Star },
    { name: "Contact Us", href: "/contactus", icon: Phone },
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

          <div className="flex items-center gap-2 font-bold text-xl lg:ml-20">
            <img src="/Logoicon.png" alt="ShopCo Logo" className="h-8 w-8" />
            <span>ShopCo</span>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-black">
          {navLinks.map((link, index) => (
            <a key={index} href={link.href} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <link.icon className="h-4 w-4" /> {link.name}
            </a>
          ))}
        </nav>

        {/* Right Section (Cart & Sign In Link) */}
        <div className="flex items-center gap-5 lg:mr-20">
          <button className="text-muted-foreground hover:text-foreground transition-colors relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              3
            </span>
          </button>
          
          {/* Desktop එකේදී Button එක වෙනුවට සාමාන්‍ය ලින්ක් එකක් දැම්මා 👇 */}
          <a 
            href="/signin" 
            className="hidden lg:flex items-center gap-1.5 text-sm font-bold text-black hover:text-foreground transition-colors pl-2 border-l border-muted-foreground/20"
          >
            <LogIn className="h-4 w-4" /> Sign In
          </a>
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
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors text-foreground"
                >
                  <div className="flex items-center gap-2.5">
                    <link.icon className="h-4 w-4 text-black" />
                    {link.name}
                  </div>
                </a>
              ))}
              
              <div className="h-px bg-muted-foreground/10 my-1 mx-2"></div>
              
              <a
                href="/signin"
                onClick={() => setIsMobileMenuOpen(false)} 
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-bold hover:bg-muted transition-colors text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <LogIn className="h-4 w-4 text-black" />
                  Sign In
                </div>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}