import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";

export default function ProductGrid({ products, isLoading, openModal }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-6 px-1">
        <span className="text-sm text-gray-500 font-medium">Showing {products.length} products</span>
      </div>

      {isLoading ? (
        <div className="m-auto flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => openModal(product)} 
              className="group relative flex flex-col w-full rounded-2xl cursor-pointer"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100 mb-3 shadow-sm">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  draggable={false}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 select-none"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
                
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-black shadow-sm z-10 uppercase tracking-wider">
                  {product.category}
                </div>

                <div className="absolute bottom-3 left-0 right-0 px-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(product);
                    }}
                    className="w-full bg-black/95 backdrop-blur-md text-white py-2.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm shadow-xl hover:bg-gray-900 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" /> Quick Add
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col px-1 flex-1">
                <div className="flex items-center gap-1 bg-yellow-50 w-max px-1.5 py-0.5 rounded-md text-[10px] font-bold text-yellow-600 mb-1.5">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  4.5/5
                </div>
                
                <h3 className="font-extrabold text-sm md:text-[15px] text-gray-900 uppercase tracking-tight line-clamp-1 select-none mb-1">
                  {product.name}
                </h3>
                
                <div className="flex items-end gap-2 select-none mt-auto">
                  <span className="font-black text-lg text-gray-900 leading-none">${product.price}</span>
                  {product.countInStock > 0 && product.countInStock <= 10 && (
                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-md ml-auto">
                      Only {product.countInStock} left
                    </span>
                  )}
                  {product.countInStock === 0 && (
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md ml-auto">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}