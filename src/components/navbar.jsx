import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, ShoppingBag } from 'lucide-react';
import { Images } from "../constant";
import { useNavigate } from 'react-router-dom'; 
import { useCart } from '../contexts/CartContext';
import CustomCursor from './CustomCursor';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = () => {
    navigate('/cartPage');
    setIsCartOpen(false);
    setIsOpen(false);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const CartButton = ({ className = "", showText = false }) => (
    <button 
      onClick={() => setIsCartOpen(!isCartOpen)} 
      className={`relative flex items-center gap-2 ${className}`}
    >
      <ShoppingBag className='h-5 w-5'/>
      {showText && <span>Cart</span>}
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );

  const CartDropdown = () => (
    <div className={`
      ${isMobile ? 'fixed inset-x-4 top-20' : 'absolute right-0'}
      mt-2 w-[70vw] md:w-80 bg-white rounded-lg shadow-lg py-4 px-2 z-50
    `}>
      <div className="max-h-96 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 border-b">
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-600">
                      {item.quantity} × {item.price} MAD
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {(item.quantity * item.price).toFixed(2)} MAD
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-4 border-t mt-2">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-medium">{totalPrice.toFixed(2)} MAD</span>
              </div>
              <button 
                onClick={handleClick}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition-colors"
              >
                View Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>

    <div className="w-full px-4 py-4 fixed top-0 left-0 z-50">

      <nav className="max-w-6xl mx-auto bg-gradient-to-r from-zinc-500/70 via-zinc-950 backdrop-blur-2xl rounded-full py-2 px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <a href="/">  <img src={Images.logo} alt="" className="h-10 hidden sm:block" /> </a>
           </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/"  className="hover:bg-zinc-800 hover:text-[#FFC23C] px-3 py-1 rounded-3xl text-white/80  transition-colors text-sm">Home</a>
            <a href="/shop"  className="text-white/80 hover:bg-zinc-800 hover:text-[#FFC23C] px-3 py-1 rounded-3xl transition-colors text-sm">Shop</a>
            <a href="/faqs"  className="text-white/80 hover:bg-zinc-800 hover:text-[#FFC23C] px-3 py-1 rounded-3xl transition-colors text-sm">FAQs</a>
            <a href="/cartPage"  className="text-white/80 hover:bg-zinc-800 hover:text-[#FFC23C] px-3 py-1 rounded-3xl transition-colors text-sm">Cart</a>
          </div>

          {/* Desktop Cart Button & Dropdown */}
          <div className="hidden md:block relative">
            <CartButton className="bg-zinc-900/50 backdrop-blur-sm text-[#fff] px-2 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors" />
          </div>

          {/* Mobile menu and cart buttons */}
          <div className="md:hidden flex items-center space-x-80">
            <CartButton className="text-white hover:text-gray-300 transition-colors" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-gray-900 backdrop-blur-2xl rounded-2xl p-4 absolute left-4 right-4 top-full w-[85vw]">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-white/80 hover:text-white transition-colors text-sm">Home</a>
              <a href="/shop" className="text-white/80 hover:text-white transition-colors text-sm">Shop</a>
              <a href="/cartPage" className="text-white/80 hover:text-white transition-colors text-sm">Cart</a>
              <a href="/faqs" className="text-white/80 hover:text-white transition-colors text-sm">FAQs</a>
            </div>
          </div>
        )}

        {/* Single Cart Dropdown for both mobile and desktop */}
        {isCartOpen && <CartDropdown  />}
      </nav>
    </div>
    </>
  );
};

export default Navbar;