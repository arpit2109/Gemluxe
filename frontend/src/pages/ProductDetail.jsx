import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZooming, setIsZooming] = useState(false);

    const imageRef = useRef(null);

    // Mock Data (Ideally fetch from API)
    const product = {
        id: id || '1',
        name: 'The Royal Sapphire Ring',
        price: 12500,
        description: 'An exceptional 12-carat sapphire surrounded by a halo of brilliant-cut diamonds. Handcrafted in platinum, this piece represents the pinnacle of our collection. Each diamond is hand-selected for superior clarity and brilliance.',
        sku: 'SKU-ROYAL-001',
        stock: 3,
        images: [
            'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=2000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop'
        ],
        details: {
            metal: 'Platinum',
            stone: 'Blue Sapphire (12ct)',
            accent: 'Diamonds (2ct TW)',
            size: '6.5 (Resizable)'
        }
    };

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            metal: product.details.metal
        }, quantity);
    };

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPosition({ x, y });
    };

    return (
        <div className="container mx-auto px-6 py-12 pt-24">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Image Gallery with Loupe Zoom */}
                <div className="flex-1 space-y-4">
                    <div
                        className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden cursor-crosshair group"
                        onMouseEnter={() => setIsZooming(true)}
                        onMouseLeave={() => setIsZooming(false)}
                        onMouseMove={handleMouseMove}
                        ref={imageRef}
                    >
                        <img
                            src={product.images[activeImage]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        {/* Zoom Lens / Overlay */}
                        {isZooming && (
                            <div
                                className="absolute inset-0 pointer-events-none hidden lg:block"
                                style={{
                                    backgroundImage: `url(${product.images[activeImage]})`,
                                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                    backgroundSize: '250%',
                                }}
                            />
                        )}
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === idx ? 'border-gold-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 space-y-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-gold-100 text-gold-800 text-xs font-bold uppercase tracking-wider rounded">Best Seller</span>
                            {product.stock < 5 && (
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider rounded">
                                    Only {product.stock} Left
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl font-playfair font-bold text-charcoal-900 mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4">
                            <p className="text-2xl text-gold-600 font-medium">${product.price.toLocaleString()}</p>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <div className="flex text-gold-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <span>(24 Reviews)</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed font-light">
                        {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm border-y border-gray-100 py-6">
                        {Object.entries(product.details).map(([key, value]) => (
                            <div key={key}>
                                <span className="text-gray-500 capitalize block mb-1">{key}</span>
                                <span className="font-medium text-charcoal-900">{value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 hover:bg-gray-50 transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 hover:bg-gray-50 transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-charcoal-900 text-white py-3 rounded-lg font-medium hover:bg-charcoal-800 transition-colors flex items-center justify-center gap-2 shadow-luxury"
                            >
                                <ShoppingBag size={20} />
                                ADD TO CART
                            </button>
                            <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-colors">
                                <Heart size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                            <Truck size={20} className="text-gold-600" />
                            <div>
                                <p className="font-medium text-charcoal-900">Free Insured Shipping</p>
                                <p className="text-xs">Delivery in 2-3 business days</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                            <ShieldCheck size={20} className="text-gold-600" />
                            <div>
                                <p className="font-medium text-charcoal-900">Lifetime Warranty</p>
                                <p className="text-xs">Authenticity guaranteed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
