import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGrid({ products, isLoading, openModal }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; 
  
  const gridRef = useRef(null);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    
    setTimeout(() => {
      if (gridRef.current) {
        const y = gridRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div id="shop-section" ref={gridRef} className="flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-6 px-1">
        <span className="text-sm text-gray-500 font-medium">
          Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length} products
        </span>
      </div>

      {isLoading ? (
        <div className="m-auto flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {currentProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => openModal(product)} 
                className="group relative flex flex-col w-full cursor-pointer"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#E2E2E2] mb-3 shadow-sm">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    draggable={false}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 select-none mix-blend-multiply"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  
                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-3 left-0 right-0 px-2 md:px-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(product);
                      }}
                      className="w-full bg-white/95 backdrop-blur-md text-black py-2 md:py-2.5 rounded-xl flex items-center justify-center gap-1.5 md:gap-2 font-bold text-xs md:text-sm shadow-xl hover:bg-black hover:text-white transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" /> Quick Add
                    </button>
                  </div>
                </div>
                
                {/* 👇 ඔයා ඉල්ලපු අලුත් Card Design එක මෙතනින් පටන් ගන්නවා 👇 */}
                <div className="flex flex-col px-1 flex-1">
                  
                  {/* Name & Star Row */}
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="font-bold text-sm md:text-base text-gray-900 line-clamp-1 capitalize">
                      {product.name.toLowerCase()}
                    </h3>
                    <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded-md text-[11px] md:text-xs font-bold text-gray-800 whitespace-nowrap">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {product.rating || "4.6"} 
                    </div>
                  </div>
                  
                  {/* Other Title / Description */}
                  <p className="text-xs md:text-sm text-gray-500 line-clamp-1 mb-2">
                    {product.description || "Warm & stylish design"}
                  </p>
                  
                  {/* Price Row */}
                  <div className="flex items-center gap-1.5 md:gap-2 mt-auto">
                    {/* Discounted Price */}
                    <span className="font-extrabold text-base md:text-xl text-gray-900 leading-none">
                      ${product.price}
                    </span>
                    
                    {/* Original Price (Strikethrough) */}
                    <span className="text-xs md:text-sm text-gray-400 line-through font-medium">
                      ${product.originalPrice || Math.round(product.price * 1.35)}
                    </span>
                    
                    {/* Discount Badge */}
                    <span className="text-[9px] md:text-[10px] font-bold text-[#FF3333] bg-[#FF3333]/10 px-2 py-0.5 rounded-full ml-auto">
                      {product.discount || "(26% OFF)"}
                    </span>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 mb-4">
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-colors ${
                      currentPage === i + 1 
                        ? "bg-black text-white shadow-md" 
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}