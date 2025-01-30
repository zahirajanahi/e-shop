import React, { useContext, useRef } from "react";
import emailjs from '@emailjs/browser';
import { CoffeeContext } from "../context/coffeeContext";
import { Link } from "react-router-dom";
import "../assets/css/productD.css";
import { Images } from "../constant";

export const Home = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_jjholjd', 'template_kkwidrs', form.current, {
                publicKey: 'SGSsbQH6QTgD-nzNq',
            })
            .then(
                () => {
                    alert('SUCCESS!');
                },
                (error) => {
                    alert('FAILED...', error.text);
                },
            );
    };
    
    const { coffeeData } = useContext(CoffeeContext); 
    const productsToShow = coffeeData.slice(1, 4);

    return (
        <>
            <header className="landing-page bg-[#251d1d] pb-5">
                <nav className="bg-transparent pt-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-10 items-center">
                            <img
                                src={Images.logo}
                                className="flex-shrink-0 w-20 pt-4 pb-5"
                                alt="Logo"
                            />
                            <div className="hidden md:flex space-x-8">
                                <Link to="/" className="text-[#948e8e] text-md font-medium home">Home </Link>
                                <Link to="/more-products" className="text-[#948e8e] text-md font-medium">Product</Link>
                                <a href="#contact" className="text-[#948e8e] text-md font-medium">Contact</a>
                            </div>
                        </div>
                    </div>
                </nav>
                <img src={Images.landigPage} className="h-[90vh] mx-auto" alt="" />
            </header>

            <section className="bg-[#ad9c8e] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <img src={Images.picture3d} alt="" />
                </div>
                <div>
                    <h1 className="text-center font-bold text-5xl text-[#885a3d] font-serif pt-[100px]">About</h1>
                    <p className="font-serif ps-20 pt-10">
                        Welcome to Brew & Bean, your one-stop shop for premium coffee
                        products and <br />
                        everything coffee-related. Explore our curated selection of coffee
                        beans, brewing gear, and <br />
                        accessories, all designed to bring the perfect cup to your home.
                        Learn about our coffee <br />
                        shop's story, our commitment to quality, and our love for all things
                        coffee. <br />
                        Start your coffee journey with us today!
                    </p>
                </div>
            </section>

            <section className="bg-[#251d1d]">
    <h2 className="text-center font-bold pt-10 text-[#948e8e] font-serif text-3xl">Our Products</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mx-auto max-w-7xl">
        {productsToShow.map((product, index) => (
            <Link to={`/product/${product.id}`} key={index}>
                <div 
                    className="p-4 bg-[#f3e7d9] rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col items-center justify-between text-center"
                >
                    <h3 className="text-xl font-semibold font-serif"><i>{product.name}</i></h3>
                    <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
                    <p className="mt-4">{product.description}</p>
                    <p className="text-lg font-bold pt-3">${product.price}</p>
                </div>
            </Link>
        ))}
    </div>
    <div className="text-center mt-6">
        <Link to="/more-products">
            <button className="bg-black py-3 px-5 font-mono text-[#948e8e] rounded-full mb-10">
                View More
            </button>
        </Link>
    </div>
</section>


            <section className="bg-[#f1e5d7] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h1 className="text-center font-bold text-5xl text-[#885a3d] font-serif pt-[170px]">Quality</h1>
                    <p className="font-serif ps-20 pt-10">
                        "Our coffee is crafted from premium, ethically sourced beans, 
                        ensuring a rich <br /> &nbsp;&nbsp;&nbsp;&nbsp; and smooth flavor in every cup. Experience exceptional quality 
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; and freshness with every sip."
                    </p>
                </div>
                <div>
                    <img src={Images.product1} alt="" />
                </div>
            </section>

            <section className="bg-[#251d1d] text-white py-12" id="contact">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-center text-3xl font-bold mb-4 text-[#948e8e] font-serif">  Contact Us</h2>
                    <p className="text-center mb-8 font-serif">We'd love to hear from you! Reach out to us using the form below.</p>
                    <div className="flex justify-center">
                        <form ref={form} onSubmit={sendEmail} className="w-full max-w-lg bg-[#f3e7d9] p-8 rounded-lg shadow-lg">
                            <div className="grid grid-cols-1 gap-6 mb-6">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700">Name</label>
                                    <input type="text" id="name" name="name" className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 bg-transparent" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-700">Email</label>
                                    <input type="email" id="email" name="email" className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 bg-transparent" required />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-gray-700">Message</label>
                                    <textarea id="message" name="message" rows="4" className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 bg-transparent text-black" required></textarea>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-black text-[#948e8e] py-2 rounded-md focus:outline-none"> Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
            
            <footer className="bg-[#251d1d] text-white py-4 text-center font-serif">
                <p>&copy; {new Date().getFullYear()} Brew & Bean. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Home;
