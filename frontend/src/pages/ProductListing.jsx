import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Filter, Search, ChevronDown, Heart, Eye, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        category: '',
        metal_type: '',
        min_price: '',
        max_price: ''
    });
    const { addToCart } = useCart();

    const observer = useRef();
    const lastProductElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        fetchProducts();
    }, [page, filters]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Mock Data with more variety for masonry effect
            await new Promise(resolve => setTimeout(resolve, 500));
            const newProducts = Array.from({ length: 8 }, (_, i) => ({
                id: `${page}-${i}`,
                name: `Luxury Item ${page}-${i}`,
                price: Math.floor(Math.random() * 5000) + 500,
                image: `https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop`, // Fixed image for stability
                category: ['Ring', 'Necklace', 'Earring'][Math.floor(Math.random() * 3)],
                metal: ['Gold', 'Platinum', 'Rose Gold'][Math.floor(Math.random() * 3)]
            }));

            setProducts(prev => page === 1 ? newProducts : [...prev, ...newProducts]);
            if (page >= 3) setHasMore(false);

        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPage(1);
        setProducts([]);
    };

    return (
        <div className="container mx-auto px-6 py-12 pt-24">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sticky Filters Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-24 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                            <Filter size={20} className="text-gold-500" />
                            <h2 className="text-lg font-playfair font-bold text-charcoal-900">Refine</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                                <div className="space-y-2">
                                    {['Ring', 'Necklace', 'Earring', 'Bracelet'].map(cat => (
                                        <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat.toUpperCase()}
                                                onChange={handleFilterChange}
                                                className="accent-gold-500"
                                            />
                                            <span className="text-sm text-gray-600 group-hover:text-gold-600 transition-colors">{cat}s</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Metal</label>
                                <select
                                    name="metal_type"
                                    onChange={handleFilterChange}
                                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500 outline-none"
                                >
                                    <option value="">All Metals</option>
                                    <option value="GOLD">Gold</option>
                                    <option value="PLATINUM">Platinum</option>
                                    <option value="ROSE_GOLD">Rose Gold</option>
                                    <option value="WHITE_GOLD">White Gold</option>
                                </select>
                            </div>

                            <div className="border-t border-gray-100 pt-6">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price Range</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        name="min_price"
                                        placeholder="Min"
                                        onChange={handleFilterChange}
                                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none"
                                    />
                                    <input
                                        type="number"
                                        name="max_price"
                                        placeholder="Max"
                                        onChange={handleFilterChange}
                                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid - Masonry Layout */}
                <div className="flex-1">
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {products.map((product, index) => {
                            const isLast = products.length === index + 1;
                            return (
                                <div
                                    ref={isLast ? lastProductElementRef : null}
                                    key={product.id}
                                    className="break-inside-avoid"
                                >
                                    <ProductCard product={product} addToCart={addToCart} />
                                </div>
                            );
                        })}
                    </div>

                    {loading && (
                        <div className="py-12 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-gold-200 border-t-gold-600 rounded-full animate-spin"></div>
                        </div>
                    )}

                    {!hasMore && !loading && (
                        <div className="py-12 text-center text-gray-400 text-sm tracking-wider">
                            END OF COLLECTION
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ product, addToCart }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay Actions */}
                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <button className="p-3 bg-white text-charcoal-900 rounded-full shadow-lg hover:bg-gold-500 hover:text-white transition-colors" title="Add to Wishlist">
                            <Heart size={18} />
                        </button>
                        <Link to={`/products/${product.id}`} className="p-3 bg-white text-charcoal-900 rounded-full shadow-lg hover:bg-gold-500 hover:text-white transition-colors" title="View Details">
                            <Eye size={18} />
                        </Link>
                        <button
                            onClick={() => addToCart(product)}
                            className="p-3 bg-white text-charcoal-900 rounded-full shadow-lg hover:bg-gold-500 hover:text-white transition-colors"
                            title="Add to Cart"
                        >
                            <ShoppingBag size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4 text-center">
                <p className="text-xs text-gold-600 font-bold uppercase tracking-widest mb-1">{product.metal} {product.category}</p>
                <h3 className="text-lg font-playfair font-bold text-charcoal-900 mb-1 group-hover:text-gold-600 transition-colors">{product.name}</h3>
                <p className="text-charcoal-700 font-medium">${product.price.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default ProductListing;
