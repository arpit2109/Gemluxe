import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, Search } from 'lucide-react';

const Header = () => {
    const { cart } = useCart();
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-luxury py-2' : 'bg-transparent py-4'}`}>
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className={`text-2xl font-serif font-bold tracking-widest transition-colors ${isScrolled ? 'text-charcoal' : 'text-charcoal'}`}>
                            GEMLUXE
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <div className="relative group">
                                <button className="text-charcoal hover:text-gold px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                                    Collections
                                </button>
                                {/* Mega Menu */}
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                        <Link to="/products?category=RING" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gold" role="menuitem">Rings</Link>
                                        <Link to="/products?category=NECKLACE" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gold" role="menuitem">Necklaces</Link>
                                        <Link to="/products?category=EARRING" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gold" role="menuitem">Earrings</Link>
                                        <Link to="/products?category=BRACELET" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gold" role="menuitem">Bracelets</Link>
                                    </div>
                                </div>
                            </div>
                            <Link to="/about" className="text-charcoal hover:text-gold px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Our Story
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="text-charcoal hover:text-gold transition-colors">
                            <Search className="h-6 w-6" />
                        </button>
                        <Link to="/cart" className="group -m-2 flex items-center p-2 text-charcoal hover:text-gold transition-colors relative">
                            <ShoppingBag className="h-6 w-6 flex-shrink-0" />
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 -mr-1 -mt-1 h-4 w-4 rounded-full bg-gold text-xs font-bold text-white flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                        <Link to={user ? "/account" : "/login"} className="text-charcoal hover:text-gold transition-colors">
                            <User className="h-6 w-6" />
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
