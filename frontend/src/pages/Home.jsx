import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <div className="bg-white">
            {/* Hero Section with Video Background */}
            <section className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="https://cdn.coverr.co/videos/coverr-jewelry-making-process-5366/1080p.mp4" type="video/mp4" />
                    {/* Fallback image if video fails or loads slowly */}
                    <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop" alt="Luxury Jewelry" className="w-full h-full object-cover" />
                </video>

                <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-5xl md:text-7xl font-playfair font-bold mb-6 tracking-wide"
                    >
                        Timeless Elegance
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-lg md:text-xl font-light tracking-widest mb-10 max-w-2xl"
                    >
                        DISCOVER THE ART OF FINE JEWELRY
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.1 }}
                    >
                        <Link
                            to="/collections"
                            className="group relative px-8 py-3 bg-transparent border border-white text-white font-medium tracking-wider hover:bg-white hover:text-charcoal-900 transition-all duration-300"
                        >
                            EXPLORE COLLECTION
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Parallax Collections */}
            <section className="py-24 px-6 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-gold-600 text-sm font-bold tracking-widest uppercase">The Collections</span>
                        <h2 className="text-4xl font-playfair font-bold text-charcoal-900 mt-2">Curated for You</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div style={{ y: y1 }} className="relative h-[600px] overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop"
                                alt="Rings Collection"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <h3 className="text-3xl font-playfair italic mb-2">Bridal</h3>
                                    <Link to="/category/rings" className="inline-flex items-center gap-2 text-sm tracking-widest hover:underline">
                                        SHOP RINGS <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div style={{ y: y2 }} className="space-y-12">
                            <div className="relative h-[400px] overflow-hidden group">
                                <img
                                    src="https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1974&auto=format&fit=crop"
                                    alt="Necklaces"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <h3 className="text-3xl font-playfair italic mb-2">High Jewelry</h3>
                                        <Link to="/category/necklaces" className="inline-flex items-center gap-2 text-sm tracking-widest hover:underline">
                                            SHOP NECKLACES <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-charcoal-50 p-12 text-center">
                                <h3 className="text-2xl font-playfair text-charcoal-900 mb-4">Bespoke Design</h3>
                                <p className="text-gray-600 mb-6 font-light">Create a piece as unique as your story. Our master jewelers bring your vision to life.</p>
                                <button className="text-gold-600 border-b border-gold-600 pb-1 hover:text-gold-700 transition-colors">
                                    BOOK CONSULTATION
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Product / Spotlight */}
            <section className="py-24 bg-charcoal-900 text-white">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <span className="text-gold-400 text-sm font-bold tracking-widest uppercase">Spotlight</span>
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold mt-4 mb-6">The Royal Sapphire</h2>
                        <p className="text-gray-300 font-light leading-relaxed mb-8">
                            An exceptional 12-carat sapphire surrounded by a halo of brilliant-cut diamonds.
                            Handcrafted in platinum, this piece represents the pinnacle of our collection.
                        </p>
                        <Link
                            to="/products/royal-sapphire"
                            className="px-8 py-3 bg-gold-500 text-charcoal-900 font-medium hover:bg-gold-400 transition-colors"
                        >
                            VIEW DETAILS
                        </Link>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute -inset-4 border border-gold-500/30 rounded-full animate-spin-slow" />
                        <img
                            src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=2000&auto=format&fit=crop"
                            alt="Royal Sapphire Ring"
                            className="relative z-10 rounded-full w-[400px] h-[400px] object-cover shadow-2xl mx-auto"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
