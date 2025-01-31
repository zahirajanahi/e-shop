import React from 'react';
import { Images } from "../constant";
import Navbar from '../components/navbar';

const Landing = () => {
    return (
        <div className='bg-[#000]'>
            <Navbar />
            <div className="relative h-[100vh]">
                <img 
                    src={Images.landing} 
                    alt="Landing Hero" 
                    className='h-full object-cover w-full' 
                />
                <div className="absolute left-16 bottom-24 text-white max-w-md">
                    <p className=" text-zinc-400 pb-4 ">
                      Authentic KAWS collectibles, streetwear, and accessories. Don’t miss out shop before they sell out .
                    </p>
                    <button className="bg-transparent border border-white rounded-3xl text-white px-6 py-3 transition duration-300 ease-in-out hover:bg-white hover:text-black hover:scale-105">
                      Shop Now
                    </button>
                </div>
            </div>
            <div className='bg-[#fff] h-[100vh]'>
                   
            </div>
        </div>
    );
};

export default Landing;
