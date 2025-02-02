import React from 'react';
import { Plus } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={product.image_url}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">${product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;