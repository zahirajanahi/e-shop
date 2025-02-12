import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
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
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg group relative"
    >
      <div className="relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        {/* Button for larger screens (visible on hover) */}
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

      {/* Always visible button on mobile */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
          <p className="text-gray-400 mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-[#FFC23C]">
              ${product.price}
            </span>
            <span className="text-sm text-gray-400">
              {product.stock} in stock
            </span>
          </div>
        </motion.div>

        {/* Mobile Add to Cart Button (always visible) */}
        <button
          onClick={() => onAddToCart(product)}
          className="lg:hidden mt-4 w-full bg-[#FFC23C] text-black px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
