import React from 'react';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    const shipping = 0; // Free
    const total = cartTotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-6 py-12 pt-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={40} className="text-gray-300" />
                </div>
                <h1 className="text-3xl font-playfair font-bold text-charcoal-900 mb-4">Your Bag is Empty</h1>
                <p className="text-gray-500 mb-8">Looks like you haven't added any pieces to your collection yet.</p>
                <Link
                    to="/collections"
                    className="px-8 py-3 bg-charcoal-900 text-white font-medium tracking-wider hover:bg-charcoal-800 transition-colors"
                >
                    EXPLORE COLLECTION
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 pt-24">
            <h1 className="text-3xl font-playfair font-bold text-charcoal-900 mb-8">Shopping Bag</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="flex-1 space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-6 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                            <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-playfair font-bold text-charcoal-900 text-lg">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.metal}</p>
                                    </div>
                                    <p className="font-medium text-charcoal-900">${item.price.toLocaleString()}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-500">Qty:</span>
                                        <select
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            className="p-1 border border-gray-200 rounded text-sm"
                                        >
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm"
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-96 flex-shrink-0">
                    <div className="bg-gray-50 p-8 rounded-xl sticky top-24">
                        <h2 className="text-xl font-playfair font-bold text-charcoal-900 mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (Estimated)</span>
                                <span>${(cartTotal * 0.08).toLocaleString()}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-charcoal-900 text-lg">
                                <span>Total</span>
                                <span>${(total + cartTotal * 0.08).toLocaleString()}</span>
                            </div>
                        </div>
                        <Link
                            to="/checkout"
                            className="w-full bg-charcoal-900 text-white py-4 rounded-lg font-medium hover:bg-charcoal-800 transition-colors flex items-center justify-center gap-2 shadow-luxury"
                        >
                            PROCEED TO CHECKOUT <ArrowRight size={18} />
                        </Link>
                        <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Secure Checkout
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
