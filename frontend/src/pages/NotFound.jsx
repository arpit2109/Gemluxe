import React from 'react';
import { Link } from 'react-router-dom';
import { Diamond } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal-900 text-white p-6 text-center">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-gold-500/20 blur-3xl rounded-full animate-pulse" />
                <Diamond size={80} className="text-gold-400 relative z-10" />
            </div>

            <h1 className="text-6xl font-playfair font-bold mb-4 text-gold-400">404</h1>
            <h2 className="text-2xl font-playfair mb-4">This Gem Seems to be Missing</h2>
            <p className="text-gray-400 max-w-md mb-8 font-light">
                The page you are looking for might have been moved, removed, or is temporarily unavailable.
            </p>

            <Link
                to="/"
                className="px-8 py-3 border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-300 font-medium tracking-wider"
            >
                RETURN TO SHOWROOM
            </Link>
        </div>
    );
};

export default NotFound;
