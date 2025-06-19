import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Images } from "../constant";

const BearbrickSuggestionSection = () => {


  const handleBearbrickRedirect = () => {
    // Replace with your actual Bearbrick site URL
    window.open('https://www.toybrickart.com/', '_blank');
  };

   const handleShop = () => {
    // Replace with your actual Bearbrick site URL
    window.open('https://www.toybrickart.com/shop', '_blank');
  };


  return (
    <div className="relative my-16 mx-4 md:mx-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-900/40 via-orange-900/30 to-yellow-800/40 backdrop-blur-sm border border-yellow-500/20"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-orange-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left content */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-medium border border-yellow-500/30">
                  New Collection
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">BEARBRICK</span> Collection
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-gray-300 text-lg mb-6 max-w-md"
              >
                Discover exclusive BEARBRICK figures and collectibles. Limited editions, rare finds, and the latest drops from your favorite brands.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  onClick={handleBearbrickRedirect}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 194, 60, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold rounded-xl overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Visit BEARBRICK Store
                    <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                <motion.button
                                  onClick={handleShop}

                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white font-medium cursor-pointer group"
                >
                
                  <span className="flex items-center gap-2">
                    <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
                     Shop BearBrick 
                  </span>
                </motion.button>
              </motion.div>
            </div>

            {/* Right visual element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Placeholder for BEARBRICK figure image - replace with actual image */}
                <div className="">
                  <img src={Images.bear} className='h-[45vh] rounded-xl object-cover' alt="" />
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-500/30 rounded-lg backdrop-blur-sm border border-yellow-400/50"
                ></motion.div>

                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-4 -left-4 w-8 h-8 bg-orange-500/30 rounded-full backdrop-blur-sm border border-orange-400/50"
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500"></div>
      </motion.div>
    </div>
  );
};

export default BearbrickSuggestionSection;