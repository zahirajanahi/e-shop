import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CoffeeContext } from "../context/coffeeContext";
import '../assets/css/productD.css'


const ProductDetails = () => {
  const { id } = useParams();
  const { coffeeData } = useContext(CoffeeContext);
  
  const product = coffeeData.find((item) => item.id === parseInt(id));

  if (!product) {
    return <p className="text-center text-2xl text-red-600">Product not found!</p>;
  }

  return (
    <div className="bg-white min-h-screen py-10 flex justify-center items-center main">
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-[90vw] h-[80vh] object-cover rounded-lg bg-[#f3e7d9]"
          />
        </div>
        <div className="md:w-1/2 p-4">
          
          <h1 className="text-4xl  font-bold text-[#885a3d]"><i>{product.name}</i></h1>
          <p className="text-gray-700 mt-4"><i>{product.description}</i></p>
         
          

          

          <div className="mt-6 flex items-center">
            <p className="text-xl font-semibold font-mono">Region :</p> &nbsp; &nbsp; 
            <p className="text-gray-700 font-semibold pt-1 font-mono">{product.region}</p>
          </div>

          <div className="mt-6 flex items-center">
            <p className="text-xl font-semibold font-mono">flavor:</p> &nbsp; &nbsp; 
            <p className="text-gray-700 font-semibold pt-1 font-mono">{product.flavor_profile}</p>
          </div>

          <div className="mt-6 flex items-center">
            <p className="text-xl font-semibold font-mono">roast:</p> &nbsp; &nbsp; 
            <p className="text-gray-700 font-semibold pt-1 font-mono">{product.roast_level}</p>
          </div>

          <div className="mt-6 flex items-center">
            <p className="text-xl font-semibold font-mono">grind:</p> &nbsp; &nbsp; 
            <p className="text-gray-700 font-semibold pt-1 font-mono mb-10">{product.grind_options}</p>
          </div>

          <p className="text-xl font-semibold font-mono mt-5">${product.price}<span className="text-gray-500 text-[20px] font-thin">/{product.weight}G</span></p>

          <button className="mt-20 bg-[#885a3d] text-[#e6d9d9]  font-mono py-3 px-6 rounded-full font-bold hover:bg-black">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
