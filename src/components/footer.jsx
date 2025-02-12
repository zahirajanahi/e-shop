import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
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
          <Link to="/shop" className="hover:text-[#FFC23C] transition">Shop</Link>
          <Link to="/about" className="hover:text-[#FFC23C] transition">About</Link>
          <Link to="/contact" className="hover:text-[#FFC23C] transition">Contact</Link>
        </div>

        {/* Right Section - Social Media Icons */}
        <div className="flex space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="text-white hover:text-[#FFC23C] transition" size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="text-white hover:text-[#FFC23C] transition" size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="text-white hover:text-[#FFC23C] transition" size={20} />
          </a>
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
