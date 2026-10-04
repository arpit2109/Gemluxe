import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = ({ onAuthClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { cartCount } = useCart();

    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Collections', path: '/collections' },
        { name: 'Rings', path: '/category/rings' },
        { name: 'Necklaces', path: '/category/necklaces' },
        { name: 'Earrings', path: '/category/earrings' },
        { name: 'Bracelets', path: '/category/bracelets' },
    ];

    // Determine styles based on page and scroll state
    const getNavbarClasses = () => {
        if (isScrolled) {
            return 'bg-charcoal-900/95 backdrop-blur-md py-4 shadow-luxury';
        }
        if (isHomePage) {
            return 'bg-transparent py-6';
        }
        return 'bg-white/95 backdrop-blur-md py-4 shadow-sm'; // Default for other pages
    };

    const getTextColorClass = () => {
        if (isScrolled) return 'text-gray-200 hover:text-gold-400';
        if (isHomePage) return 'text-white hover:text-gold-400';
        return 'text-charcoal-900 hover:text-gold-600';
    };

    const getIconColorClass = () => {
        if (isScrolled) return 'text-gray-200';
        if (isHomePage) return 'text-white';
        return 'text-charcoal-900';
    };

    const logoColorClass = (isScrolled || isHomePage) ? 'text-gold-400' : 'text-charcoal-900';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${getNavbarClasses()}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className={`text-2xl font-playfair font-bold tracking-wider ${logoColorClass}`}>
                    GEMLUXE
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium tracking-wide transition-colors ${getTextColorClass()}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-6">
                    <button className={`${getIconColorClass()} hover:text-gold-400 transition-colors`}>
                        <Search size={20} />
                    </button>
                    <button
                        onClick={onAuthClick}
                        className={`${getIconColorClass()} hover:text-gold-400 transition-colors`}
                    >
                        <User size={20} />
                    </button>
                    <Link to="/cart" className={`${getIconColorClass()} hover:text-gold-400 transition-colors relative`}>
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-gold-500 text-charcoal-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden ${getIconColorClass()}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-charcoal-900 text-white py-6 px-6 shadow-xl md:hidden">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-lg font-medium hover:text-gold-400"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                onAuthClick();
                            }}
                            className="text-lg font-medium hover:text-gold-400 text-left"
                        >
                            Account
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
