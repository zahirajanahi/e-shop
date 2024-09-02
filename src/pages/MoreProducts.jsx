// src/pages/MoreProducts.jsx
import React, { useContext, useState } from "react";
import { CoffeeContext } from "../context/coffeeContext";
import { Link } from "react-router-dom";
import "../assets/css/home.css";
import { Images } from "../constant";

export const MoreProducts = () => {
  const { coffeeData, loading } = useContext(CoffeeContext);
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
                <Link to="/" className="text-[#948e8e] text-md font-medium">Contact</Link>
              </div>
            </div>
          </div>
        </nav>
        <img src={Images.landigPage} className="h-[90vh] mx-auto" alt="" />
      </header>

      <section className="bg-[#251d1d]">
        <h2 className="text-center font-bold pt-10 text-[#948e8e] font-serif text-3xl">All Products</h2>
        <div className="text-center mt-6 mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="py-2 px-4 rounded-full border-2 border-[#f3e7d9] focus:outline-none focus:border-black bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className="p-4 bg-[#f3e7d9] rounded-xl ms-5 me-5 pb-10 shadow-md">
                <h3 className="text-xl font-semibold ps-6 font-serif"><i>{product.name}</i></h3>
                <img src={product.image_url} alt={product.name} className="w-full h-auto" />
                <p>{product.description}</p>
                <p className="text-lg font-bold">${product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-[#948e8e]">No products found.</p>
          )}
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
