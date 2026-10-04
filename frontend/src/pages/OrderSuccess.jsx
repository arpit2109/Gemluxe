import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';

const OrderSuccess = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center pt-24">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-fade-in">
                <CheckCircle size={40} className="text-green-500" />
            </div>

            <h1 className="text-4xl font-playfair font-bold text-charcoal-900 mb-4">Thank You</h1>
            <p className="text-xl text-gray-600 mb-2">Your order has been placed successfully.</p>
            <p className="text-gray-400 mb-8">Order #GL-88342</p>

            <div className="bg-gray-50 p-6 rounded-xl max-w-md w-full mb-8 text-left">
                <div className="flex items-start gap-4">
                    <Package className="text-gold-600 mt-1" />
                    <div>
                        <h3 className="font-bold text-charcoal-900">Estimated Delivery</h3>
                        <p className="text-gray-500 text-sm">Nov 24, 2023 - Nov 26, 2023</p>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
                    We've sent a confirmation email to <span className="font-medium text-charcoal-900">customer@example.com</span>
                </div>
            </div>

            <div className="flex gap-4">
                <Link
                    to="/profile"
                    className="px-6 py-3 border border-gray-200 text-charcoal-900 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    View Order
                </Link>
                <Link
                    to="/"
                    className="px-6 py-3 bg-charcoal-900 text-white rounded-lg hover:bg-charcoal-800 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
