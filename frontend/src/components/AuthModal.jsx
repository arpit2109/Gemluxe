import React, { useState } from 'react';
import { X, Smartphone } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('phone'); // phone, otp

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-charcoal-900 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="p-8 text-center">
                    <h2 className="text-2xl font-playfair font-bold text-charcoal-900 mb-2">Welcome to GemLuxe</h2>
                    <p className="text-gray-500 mb-8 text-sm">Access your wishlist, orders, and exclusive offers.</p>

                    {step === 'phone' ? (
                        <div className="space-y-6">
                            <div className="text-left">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mobile Number</label>
                                <div className="flex gap-3">
                                    <select className="p-3 border border-gray-200 rounded-lg bg-gray-50 outline-none">
                                        <option>+1</option>
                                        <option>+44</option>
                                    </select>
                                    <input
                                        type="tel"
                                        placeholder="(555) 000-0000"
                                        className="flex-1 p-3 border border-gray-200 rounded-lg outline-none focus:border-gold-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => setStep('otp')}
                                className="w-full bg-charcoal-900 text-white py-3 rounded-lg font-medium hover:bg-charcoal-800 transition-colors"
                            >
                                Send Code
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center mx-auto">
                                <Smartphone className="text-gold-600" size={24} />
                            </div>
                            <p className="text-sm text-gray-600">Enter the code sent to your mobile.</p>
                            <div className="flex gap-2 justify-center">
                                {[...Array(6)].map((_, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        className="w-10 h-10 text-center text-lg font-bold border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
                                    />
                                ))}
                            </div>
                            <button
                                onClick={onClose} // Simulate success
                                className="w-full bg-gold-500 text-white py-3 rounded-lg font-medium hover:bg-gold-600 transition-colors"
                            >
                                Verify & Login
                            </button>
                            <button
                                onClick={() => setStep('phone')}
                                className="text-xs text-gray-400 hover:text-charcoal-900"
                            >
                                Back to Number
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 p-4 text-center text-xs text-gray-400">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
