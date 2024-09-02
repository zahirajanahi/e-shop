import React, { useContext, useState } from "react";
import { CoffeeContext } from "../context/coffeeContext";
import { Link } from "react-router-dom";
import "../assets/css/productD.css";
import { Images } from "../constant";

export const MoreProducts = () => {
  const { coffeeData } = useContext(CoffeeContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = coffeeData.slice(1).filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="landing-page bg-[#251d1d]">
        <nav className="bg-transparent pt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-10 items-center">
              <img
                src={Images.logo}
                className="flex-shrink-0 w-20 pt-4 pb-5"
                alt="Logo"
              />
              <div className="hidden md:flex space-x-8">
                <Link to="/" className="text-[#948e8e] text-md font-medium home">Home</Link>
                <Link to="/" className="text-[#948e8e] text-md font-medium">Product</Link>
                <a href="#contact" className="text-[#948e8e] text-md font-medium">Contact</a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <section className="bg-[#251d1d] pb-28 h-[450vh]">
        <h2 className="text-center font-bold pt-10 text-[#948e8e] font-serif text-3xl">Our Products</h2>
        <div className="text-center mt-6 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 rounded-md bg-[#f3e7d9] text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mx-auto max-w-7xl">
          {filteredProducts.map((product, index) => (
            <div 
              key={index} 
              className="p-4 bg-[#f3e7d9] rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col items-center justify-between text-center"
            >
              <h3 className="text-xl font-semibold font-serif"><i>{product.name}</i></h3>
              <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
              <p className="mt-4">{product.description}</p>
              <p className="text-lg font-bold pt-3">${product.price}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/">
            <button className="bg-black py-3 px-5 font-mono text-[#948e8e] rounded-full mb-10">
              Back ←
            </button>
          </Link>
        </div>
      </section>

     
    </>
  );
};

export default MoreProducts;
