import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              opacity: { duration: 0.2 }
            }}
            style={{ perspective: 1000 }}
            onClick={handleContentClick}
            className="bg-zinc-900 rounded-2xl overflow-hidden w-full max-w-4xl mx-auto max-h-[90vh] md:max-h-[80vh] shadow-2xl flex flex-col lg:flex-row"
          >
            {/* Image Section - now with fixed aspect ratio */}
            <div className="lg:w-1/2 h-auto min-h-[300px] lg:min-h-[400px] relative overflow-hidden flex items-center justify-center bg-zinc-800">
              <ImageCarousel
                images={product.images || []}
                alt={product.title}
                className="w-full h-full object-contain p-4"
                showThumbnails={true}
                imageClassName="object-contain max-h-[400px]"
              />
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-6 overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-white pr-4"
                >
                  {product.title}
                </motion.h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0"
                >
                  <X size={24} />
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-3xl font-bold text-[#FFC23C]">
                    {product.price} MAD
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Category</h3>
                  <span className="inline-block bg-[#FFC23C]/20 text-[#FFC23C] px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {product.category}
                  </span>
                </div>

                {product.images && product.images.length > 1 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Images ({product.images.length})
                    </h3>
                    <p className="text-gray-400">
                      Navigate through {product.images.length} product images using the carousel
                    </p>
                  </div>
                )}

                {product.details?.specifications && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Specifications</h3>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {product.details.specifications.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.details?.features && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Features</h3>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {product.details.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAddToCart(product)}
                  className="w-full bg-[#FFC23C] text-black px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-[#ffd167] transition-colors"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;