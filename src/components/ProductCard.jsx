import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import ProductDetailModal from '../components/ProductDetailModal';
import ImageCarousel from '../components/ImageCarousel';

const ProductCard = ({ product, onAddToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg group relative"
      >
        <div className="relative overflow-hidden h-64.5  ">
          <ImageCarousel
            images={product.images || []}
            alt={product.title}
            className=" h-full w-full"
            showThumbnails={false}
          />
          
          {/* Hover overlay for larger screens */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black bg-opacity-40 lg:flex items-center justify-center hidden"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onAddToCart(product)}
              className="bg-[#FFC23C] text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </motion.button>
          </motion.div>
        </div>

        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-white mb-2">{product.title}</h3>
            <p className="text-gray-400 text-[15px] mb-4 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-[#FFC23C]">
                {product.price} MAD
              </span>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                View Details
              </button>
            </div>
          </motion.div>
          
          {/* Mobile Add to Cart Button */}
          <button
            onClick={() => onAddToCart(product)}
            className="lg:hidden mt-4 w-full bg-[#FFC23C] text-black px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </motion.div>

      <ProductDetailModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={onAddToCart}
      />
    </>
  );
};

export default ProductCard;