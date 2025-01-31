import React, { useState } from 'react';
// import emailjs from '@emailjs/browser';
// import { Link } from "react-router-dom";
// import "../assets/css/productD.css";
import { Toaster } from 'react-hot-toast';

import JsonData from '../constant/data';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import ContactForm from '../components/ContactForm';


export const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

    return (
        <>  
         <h1 className="text-blue-900 text-5xl text-center pt-10">Testing ...</h1>


         <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Our Store</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {JsonData.map(product => (
  <ProductCard
    key={product.id}
    product={product}
    onAddToCart={handleAddToCart}
  />
))}
            </div>
          </div>
          
          <div>
            <Cart
              items={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
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

        </>
    );
};

export default Home;
