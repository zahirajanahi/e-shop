import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import ContactForm from '../components/ContactForm';
import Navbar from '../components/navbar';
import { useCart } from '../contexts/CartContext';

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <Navbar cartItems={cartItems} />

      <main className="max-w-7xl mx-auto px-4 py-8 pt-28">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>

          <div>
            <Cart
              items={cartItems}
              onRemoveFromCart={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onCheckout={() => setShowContactForm(true)}
            />
          </div>
        </div>
      </main>

      {showContactForm && (
        <ContactForm
          cartItems={cartItems}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </div>
  );
};

export default Shop;
