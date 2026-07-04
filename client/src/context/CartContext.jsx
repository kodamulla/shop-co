import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // බ්‍රවුසරයේ කලින් සේව් කරපු දත්ත තියෙනවද බලලා Cart එක හදනවා
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopco_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Cart එකට බඩුවක් දාන හැමවෙලේම ඒක LocalStorage එකේ සේව් කරනවා (Refresh වුණත් මැකෙන්නේ නෑ)
  useEffect(() => {
    localStorage.setItem('shopco_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item._id === product._id);
      if (existingItem) {
        return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart(prev => prev.map(item => 
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);