import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/navbar';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import Footer from '../components/footer';
import { MessageCircle, Search, SlidersHorizontal, X } from 'lucide-react';
import { Images } from "../constant";
import { LiaWhatsapp } from "react-icons/lia";
import CustomCursor from '../components/CustomCursor';
import Swal from 'sweetalert2';



export const ShopT = () => {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart } = useCart();
  // Add new state for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    category: 'all',
    sortBy: 'newest'
  });

   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
     fetchProducts();
   }, []);
   
  const handleAddToCart = (product) => {
    addToCart(product);
  
    // Show SweetAlert notification
    Swal.fire({
      title: "Added to Cart!",
      text: `Your product has been added to your cart.`,
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      position: "top-end",
      background: "#1f1f1f", 
      color: "#FFC23C", 
      iconColor: "#FFC23C", 
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        content: "custom-swal-content"
      }
    });
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'tableau')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/0661553462', '_blank');
  };

  // Add filter handlers
  const handleFilterChange = (title, value) => {
    setFilters(prev => ({
      ...prev,
      [title]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: 'all',
      category: 'all',
      sortBy: 'newest'
    });
    setSearchTerm('');
  };

  // Filter products based on all criteria
  const filteredProducts = products.filter(product => {
    // Search filter
    const matchesSearch = !searchTerm || 
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    // Price range filter
    let matchesPrice = true;
    if (filters.priceRange === 'under100') {
      matchesPrice = product.price < 100;
    } else if (filters.priceRange === '100to500') {
      matchesPrice = product.price >= 100 && product.price <= 500;
    } else if (filters.priceRange === 'over500') {
      matchesPrice = product.price > 500;
    }

    // Category filter
    const matchesCategory = filters.category === 'all' || product.category === filters.category;

    return matchesSearch && matchesPrice && matchesCategory;
  }).sort((a, b) => {
    // Sort products
    if (filters.sortBy === 'priceAsc') {
      return a.price - b.price;
    } else if (filters.sortBy === 'priceDesc') {
      return b.price - a.price;
    } else {
      // 'newest' is default
      return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  return (
    <>
      <CustomCursor/>

      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: [10, 0, 0, 10]
          }}
          transition={{ 
            duration: 3,
            times: [0, 0.1, 0.9, 1],
            repeat: Infinity,
            repeatDelay: 5
          }}
          className="mb-2 bg-black text-white px-4 py-2 rounded-lg text-sm shadow-lg"
        >
          Contact us on WhatsApp!
        </motion.div>
        
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1 
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 25px rgba(255, 194, 60, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWhatsAppClick}
          className="bg-[#FFC23C] text-black p-4 rounded-full shadow-lg flex items-center justify-center group"
          aria-label="Contact us on WhatsApp"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <LiaWhatsapp size={24}  />

          </motion.div>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            whileHover={{ 
              width: "auto",
              opacity: 1,
              marginLeft: "8px"
            }}
            className="overflow-hidden whitespace-nowrap font-semibold"
          >
            Chat with us
          </motion.span>
        </motion.button>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
        <Toaster position="top-right" />
        <Navbar cartItems={cartItems} />
        
        <div className="relative h-[60vh] overflow-hidden">
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            src={Images.shophero}
            alt="KAWS Collection"
            className="object-cover brightness-50"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white"
          >
            <h1 className="text-5xl font-bold mb-4">KAWS Collection</h1>
            <p className="text-xl text-gray-300 ps-8">
              Discover our exclusive selection of <span className='font-bold text-[#FFC23C]'>KAWS</span>    figures

              {/* <span className='bg-[#FFC23C] px-2 py-1 font-semibold rounded-xl text-black ms-1 me-1'>KAWS</span>  */}
            </p>
          </motion.div>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Search and Filter Controls */}
          <div className="mb-8 flex  items-center justify-between ">
            <div className="relative flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[40vw]  md:ms-10 px-4 py-2 pl-10 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC23C]"
              />
              <Search className="absolute md:ms-10 left-3 top-2.5 text-gray-400" size={20} />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:me-10  me-10 px-4 py-2 bg-zinc-800 text-white rounded-lg flex items-center gap-2 hover:bg-zinc-700"
            >
              <SlidersHorizontal size={20} />
              Filters
            </motion.button>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-zinc-800 rounded-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="text-[#FFC23C] hover:underline text-sm flex items-center gap-1"
                >
                  <X size={16} />
                  Reset Filters
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price Range
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full bg-zinc-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFC23C]"
                  >
                    <option value="all">All Prices</option>
                    <option value="under100">Under $100</option>
                    <option value="100to500">$100 - $500</option>
                    <option value="over500">Over $500</option>
                  </select>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full bg-zinc-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFC23C]"
                  >
                    <option value="all">All Categories</option>
                    <option value="figures">Kaws</option>
                    <option value="paintings">BearBrick</option>
                    <option value="accessories">Tableau</option>
                  </select>
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full bg-zinc-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFC23C]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No products found matching your criteria</p>
              <button
                onClick={resetFilters}
                className="mt-4 text-[#FFC23C] hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default ShopT;