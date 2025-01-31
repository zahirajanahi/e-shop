import React, { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { Images } from "../constant";




const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-[100vw] px-4 py-4 fixed top-0 left-0 z-50">
      <nav className="max-w-6xl mx-auto bg-gradient-to-r from-zinc-500/70 via-zinc-950 backdrop-blur-2xl rounded-full py-2 px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
             <img src={Images.lik} alt="" className='h-10' />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#"    onClick={() => scrollToSection('hero-section')} className="text-white/80 hover:text-white transition-colors text-sm">Home</a>
            <a href="#"    onClick={() => scrollToSection('wil')} className="text-white/80 hover:text-white transition-colors text-sm">Shop</a>
            <a href="#" onClick={() => scrollToSection('about2')} className="text-white/80 hover:text-white transition-colors text-sm">Blog</a>
          </div>

          {/* Sign Up Button */}
          <div className="hidden md:block">
            <button onClick={() => scrollToSection('Contact')} className="bg-zinc-900/50 backdrop-blur-sm text-[#fff] px-5 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                Contact Us 
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden  ">
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
          <div className="md:hidden mt-4  bg-gray-900 backdrop-blur-2xl rounded-2xl p-4 absolute left-4 right-4 top-full w-[90vw]">
            <div className="flex flex-col space-y-4">
            <a href="#"    onClick={() => scrollToSection('hero-section')} className="text-white/80 hover:text-white transition-colors text-sm">Home</a>
            <a href="#"    onClick={() => scrollToSection('wil')} className="text-white/80 hover:text-white transition-colors text-sm">about</a>
            <a href="#" onClick={() => scrollToSection('about2')} className="text-white/80 hover:text-white transition-colors text-sm">Features</a>
              <button  onClick={() => scrollToSection('Contact')}  className="bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors w-full">
                   Contact Us 
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;