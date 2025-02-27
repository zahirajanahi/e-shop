import React, { useState, useRef } from 'react';
import { Images } from "../constant";
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import Footer from '../components/footer';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { LiaWhatsapp } from 'react-icons/lia';
import CustomCursor from '../components/CustomCursor';
import { Youtube } from 'react-feather';
import { Helmet } from "react-helmet";



const Landing = () => {
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(Images.img1);
    const { scrollYProgress } = useScroll();
    const gridSectionRef = useRef(null);
    
    const handleMouseEnter = () => {
        setImageSrc(Images.img2);
    };

    const handleMouseLeave = () => {
        setImageSrc(Images.img1);
    };

    const handleClick = () => {
        navigate('/shop');
    };

    // const handleWhatsAppClick = () => {
    //     window.open('https://wa.me/0661715003', '_blank');
    // };

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };
     
    const textVariant = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
    };

    const handleScrollToCollections = () => {
        if (gridSectionRef.current) {
            gridSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <>
             <CustomCursor/>

             <Helmet>
                <link rel="icon" type="image/png" href={Images.logo} sizes="280x280" />
            </Helmet>

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
                    // onClick={handleWhatsAppClick}
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
                        <LiaWhatsapp size={24} />
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

            <div className='bg-[#000]'>
                <Navbar />
                <div className="relative h-[100vh] overflow-hidden">
                    <picture>
                        <source
                            media="(max-width: 768px)"
                            srcSet={Images.landing2}
                        />
                        <motion.img
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            src={Images.landing}
                            alt="Landing Hero"
                            className='h-full object-cover w-full'
                        />
                    </picture>
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="absolute left-4 md:left-16 bottom-16 text-white max-w-md px-4 md:px-0"
                    >
                        <p className="text-zinc-400 pb-4 text-sm md:text-base">
                          Authentic KAWS collectibles, streetwear, and accessories. Don't miss out, shop before they sell out.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-transparent border border-white rounded-3xl text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
                            onClick={handleClick}
                        >
                            Shop Now
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className='bg-gradient-to-r from-black via-zinc-950 to-gray-950 flex flex-col md:flex-row md:space-x-64 px-4 md:px-0'
            >
                <motion.img
                    src={imageSrc}
                    animate={{ y: [-20, 0, -20] }}
                    transition={{
                        repeat: Infinity,
                        duration: 6,
                        ease: "easeInOut"
                    }}
                    whileHover={{ scale: 1.05 }}
                    className='h-[50vh] md:h-[80vh] mt-10 mx-auto md:mx-0'
                    alt="KAWS figure"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
                <div className='pt-10 md:pt-20 text-center md:text-left'>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className='font-semibold text-lg text-white flex space-x-2 group mx-auto md:mx-0'
                        onClick={handleScrollToCollections}
                    >
                        <motion.span className='border-b-2 pb-2 flex group-hover:border-[#FFC23C] transition-all duration-300'>
                            View Collections
                            <motion.div
                                whileHover={{ x: 4, y: 4 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <ArrowDownRight className='ms-3' />
                            </motion.div>
                        </motion.span>
                    </motion.button>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className='text-xl md:text-[2.10rem] text-[#fff] font-bold flex flex-col mt-20 md:mt-36 mb-5'
                    >
                        <motion.span variants={textVariant} className='pb-3'>KAWS FIGURES ARE MORE THAN JUST</motion.span>
                        <motion.span variants={textVariant} className='pb-3'>TOYS - THEY ARE STUNNING <span className='text-[#FFC23C]'>WORKS</span></motion.span>
                        <motion.span variants={textVariant} className='pb-3' ><span className='text-[#FFC23C]'>OF ART</span> THAT TRANSCEND</motion.span>
                        <motion.span variants={textVariant}>TRADITIONAL BOUNDARIES.</motion.span>
                    </motion.div>
                </div>
            </motion.div>

            
            {/* GRID PICTURES 2 VERSION  */}
 
            <div className='bg-white mt-12 grid-section hidden md:block' ref={gridSectionRef}>
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='flex space-x-1 items-center justify-center'
        >
            <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={Images.grid4} 
                className='w-[5w] h-[80vh]' 
                alt="" 
            />
            <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={Images.grid2} 
                className='w-[5w] h-[80vh]' 
                alt="" 
            />
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='flex space-x-2 items-center justify-center'
        >
            <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={Images.grid3} 
                className='w-[6w] h-[80vh]' 
                alt="" 
            />
            <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={Images.grid} 
                className='w-[6w] h-[80vh]' 
                alt="" 
            />
        </motion.div>
            </div>
            <div className="bg-white mt-12 px-4 block lg:hidden" ref={gridSectionRef}>
    <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-center"
    >
        <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={Images.grid4} 
            className="w-full md:w-[40vw] h-[50vh] object-cover" 
            alt="" 
        />
        <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={Images.grid2} 
            className="w-full md:w-[40vw] h-[50vh] object-cover" 
            alt="" 
        />
    </motion.div>

    <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-center mt-6"
    >
        <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={Images.grid3} 
            className="w-full md:w-[45vw] h-[50vh] object-cover" 
            alt="" 
        />
        <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={Images.grid} 
            className="w-full md:w-[45vw] h-[50vh] object-cover" 
            alt="" 
        />
    </motion.div>
            </div>
           {/* END GRID PICTURES 2 VERSION */}

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className='bg-gradient-to-r from-black via-zinc-950 to-gray-950 w-[90vw] md:w-[85vw] mx-auto h-[50vh] md:h-[40vh] mt-5 rounded-2xl flex flex-col md:flex-row items-center justify-between p-6 md:p-0'
            >
                <div>
                    <motion.h1
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        className='text-2xl md:text-3xl text-white pb-10 md:pb-20 text-center md:text-left md:ms-5'
                    >
                        SHOP YOUR <span className='text-[#FFC23C]'>KAWS</span> <br /> NOW !
                    </motion.h1>
                    <motion.a
                        href="/shop"
                        whileHover={{ scale: 1.05 }}
                        className='font-semibold text-white flex space-x-2 group justify-center md:justify-start md:ms-10'
                    >
                        <motion.span className='border-b-2 pb-1 flex group-hover:border-[#FFC23C] transition-all duration-300'>
                            Shop Now
                            <motion.div
                                whileHover={{ x: 4, y: -4 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <ArrowUpRight className='ms-3' />
                            </motion.div>
                        </motion.span>
                    </motion.a>
                </div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mt-6 md:mt-0"
                >
                    <img src={Images.shopn} className='h-[25vh] md:h-[37vh] md:me-10 rounded-2xl' alt="" />
                </motion.div>
            </motion.div>

            <Footer />
        </>
    );
};

export default Landing;