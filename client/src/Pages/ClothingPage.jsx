import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from "../context/CartContext";

// Components 
import { Navbar } from "@/components/landingpage/navbar";
import { Footer } from "@/components/landingpage/footer";
import { Heroo } from "@/components/clothingpage/hero";
import { ModernAlert } from "@/components/ui/ModernAlert";
import FilterSidebar from "@/components/clothingpage/FilterSidebar";
import ProductGrid from "@/components/clothingpage/ProductGrid";
import QuickAddModal from "@/components/clothingpage/QuickAddModal";

export default function ClothingPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  
  // Filter States
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(400);
  const [openSection, setOpenSection] = useState("Category");

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Alert Config
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) { 
        console.error("Error fetching products:", err); 
        // Testing සදහා Dummy Data
        setProducts([
          { _id: "1", name: "GRADIENT GRAPHIC T-SHIRT", description: "Premium cotton blend everyday t-shirt.", price: 145, category: "Men", sizes: ["Small", "Medium", "Large"], imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400&auto=format&fit=crop", countInStock: 15 },
          { _id: "2", name: "SKINNY FIT JEANS", description: "Comfortable stretch denim for all-day wear.", price: 240, category: "Men", sizes: ["Medium", "Large"], imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&auto=format&fit=crop", countInStock: 5 },
          { _id: "3", name: "URBAN SPORT JACKET", description: "Lightweight & water-resistant jacket.", price: 320, category: "Women", sizes: ["Small", "Medium"], imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&auto=format&fit=crop", countInStock: 20 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Modal Scroll Lock
  useEffect(() => {
    if (selectedProduct) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProduct]);

  const handleAddToCart = (e, product, size = null) => {
    e.stopPropagation(); 
    
    if (!size && product.sizes && product.sizes.length > 0) {
      setAlertConfig({
        isOpen: true,
        type: "warning",
        title: "Wait!",
        message: "Please select a size first!",
      });
      return;
    }

    const productToAdd = size ? { ...product, selectedSize: size } : product;
    addToCart(productToAdd);
    
    setAlertConfig({
      isOpen: true,
      type: "success",
      title: "Success!",
      message: `${product.name} Added to Cart!`,
    });
    
    if (selectedProduct) {
      setSelectedProduct(null); // Modal එක වහනවා
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col font-sans text-gray-900">
      <Navbar />
      <Heroo />
      
      <main className="flex-1 flex flex-col pb-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 pt-10 flex flex-col lg:flex-row gap-8 items-start">
          
          {/* 🎛️ Left Sidebar Component */}
          <FilterSidebar 
            minPrice={minPrice} 
            setMinPrice={setMinPrice} 
            maxPrice={maxPrice} 
            setMaxPrice={setMaxPrice} 
            openSection={openSection} 
            setOpenSection={setOpenSection} 
          />

          {/* 🛍️ Right Content Component */}
          <ProductGrid 
            products={products} 
            isLoading={isLoading} 
            openModal={setSelectedProduct} 
          />

        </div>
      </main>

      {!isLoading && <Footer />}

      {/* 📦 Quick Add Modal Component */}
      <QuickAddModal 
        selectedProduct={selectedProduct} 
        closeModal={() => setSelectedProduct(null)} 
        handleAddToCart={handleAddToCart} 
      />

      <ModernAlert 
        isOpen={alertConfig.isOpen}
        onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </div>
  );
}