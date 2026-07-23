import { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  TrendingUp, 
  Shirt,
  HelpCircle,
  Menu,
  X,
  User, 
  LogOut,
  UserCircle,
  Home
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); 
  
  const { cart } = useCart(); 

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token"); 
  });

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      if (isUserDropdownOpen) setIsUserDropdownOpen(false);
    };

    if (isMobileMenuOpen || isUserDropdownOpen) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen, isUserDropdownOpen]);

  // Logout Function එක
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.location.href = "/"; // මුල් පිටුවට යවනවා
  };

  const handleNavClick = (e, href) => {
    if (href.startsWith("/#")) {
      const targetId = href.substring(2); 
      const element = document.getElementById(targetId);
      
      if (element) {
        e.preventDefault(); 
        element.scrollIntoView({ behavior: "smooth" }); 
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "/#home", icon: Home },
    { name: "New Arrivals", href: "/#new-arrivals", icon: TrendingUp },
    { name: "Clothing", href: "/clothing", icon: Shirt },
    { name: "Details", href: "/details", icon: HelpCircle },
  ];

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 relative">
        
        {/* Left Section: Mobile Menu Toggle & Logo */}
        <div className="flex items-center gap-3">
          <button 
            className="lg:hidden p-2 -ml-2  hover:bg-muted text-foreground rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* 👇 අලුත් කොටස: Logo එක Click කරාම Home යන්න <a> tag එකක් දැම්මා */}
          <a href="/" className="flex items-center gap-2 font-bold text-xl lg:ml-20">
            <img src="/Logoicon.png" alt="ShopCo Logo" className="h-8 w-8" />
            <span>ShopCo</span>
          </a>
        </div>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-black">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <link.icon className="h-4 w-4" /> {link.name}
            </a>
          ))}
        </nav>

        {/* Right Section (Cart & Auth) */}
        <div className="flex items-center gap-5 lg:mr-20 relative">
          <a href="/cart" className="text-muted-foreground hover:text-foreground transition-colors relative">
            <ShoppingCart className="h-5 w-5" />
            
            {cart && cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-primary-foreground">
                {cart.length}
              </span>
            )}
            
          </a>     
          {!isLoggedIn ? (
            <a 
              href="/signin" 
              className="hidden lg:flex items-center gap-1.5 text-sm font-medium px-5 py-2 rounded-sm bg-black text-white hover:bg-white border border-transparent hover:border-black hover:text-black transition-all duration-300 ml-2 shadow-sm"
            >
              Sign In
            </a>
          ) : (
            <div className="relative hidden lg:block">
              <button 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-muted border hover:bg-muted/80 transition-colors pl-2 ml-2 border-l border-muted-foreground/20"
              >
                <User className="h-5 w-5 text-foreground pr-2" />
              </button>

              {/* Desktop User Dropdown */}
              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-40 rounded-xl border bg-background p-2 shadow-lg flex flex-col gap-1"
                  >
                    <a
                      href="/account"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <UserCircle className="h-4 w-4" />
                      Account
                    </a>

                    <div className="h-px bg-muted-foreground/10 my-0.5 mx-2"></div>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
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
                  onClick={(e) => { 
                    setIsMobileMenuOpen(false); 
                    handleNavClick(e, link.href);
                  }} 
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors text-foreground"
                >
                  <div className="flex items-center gap-2.5">
                    <link.icon className="h-4 w-4 text-black" />
                    {link.name}
                  </div>
                </a>
              ))}
              
              {/* Mobile Menu Conditional Rendering */}
              {!isLoggedIn ? (
                <a
                  href="/signin"
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="flex items-center justify-center gap-2 rounded-sm px-4 py-2 mt-2 text-sm font-medium bg-black text-white border  hover:bg-white hover:text-black hover:border-black transition-all duration-300 shadow-sm"
                >
                  Sign In
                </a>
              ) : (
                <>
                  <a
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-bold hover:bg-muted transition-colors text-foreground"
                  >
                    <div className="flex items-center gap-2.5">
                      <UserCircle className="h-4 w-4 text-black" />
                      Account
                    </div>
                  </a>

                  <button
                    onClick={handleLogout} 
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-bold hover:bg-muted transition-colors text-foreground"
                  >
                    <div className="flex items-center gap-2.5">
                      <LogOut className="h-4 w-4 text-black" />
                      Log out
                    </div>
                  </button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}