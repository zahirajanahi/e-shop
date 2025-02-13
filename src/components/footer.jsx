import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Send, Twitter } from "lucide-react";
import { useCart } from '../contexts/CartContext';

const Footer = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hello! I'm interested in purchasing items from your store. My cart total is ${total.toFixed(2)} MAD.`);
    window.open(`https://wa.me/+2120774054190?text=${message}`, '_blank');
  };
  return (
    <footer className="bg-black text-white py-12 mt-16">
      <div className=" w-[90vw] mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Brand Info */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold text-[#FFC23C]">KAWS STORE</h2>
          <p className="text-gray-400 mt-2 max-w-md">
            Your go-to destination for authentic KAWS collectibles and streetwear.
          </p>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="flex space-x-8 text-sm text-gray-400">
        <Link to="/" className="hover:text-[#FFC23C] transition">Home</Link>
          <Link to="/shop" className="hover:text-[#FFC23C] transition">Shop</Link>
          <Link to="/faqs" className="hover:text-[#FFC23C] transition">FaQs</Link>
        </div>

        {/* Right Section - Social Media Icons */}
        <div className="flex space-x-6 pt-5">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="text-white hover:text-[#FFC23C] transition" size={20} />
          </a>
          <a href="https://www.instagram.com/kaws.maroc?igsh=M2VhNXV2cGt6MXJl" target="_blank" rel="noopener noreferrer">
            <Instagram className="text-white hover:text-[#FFC23C] transition" size={20} />
          </a>
          <button onClick={handleWhatsAppClick} href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Send className="text-white hover:text-[#FFC23C] transition" size={20} />
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-sm mt-10 border-zinc-600 border-t pt-8 w-[90vw] mx-auto">
        <p>&copy; {new Date().getFullYear()} KAWS Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
