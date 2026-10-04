import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Smartphone } from 'lucide-react';

const Checkout = () => {
    const [step, setStep] = useState(1); // 1: Details, 2: OTP, 3: Payment

    return (
        <div className="container mx-auto px-6 py-12 pt-24">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-12">
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-gold-600' : 'text-gray-300'}`}>
                        <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">1</span>
                        <span className="font-medium hidden sm:block">Details</span>
                    </div>
                    <div className={`w-16 h-0.5 mx-4 ${step >= 2 ? 'bg-gold-600' : 'bg-gray-200'}`} />
                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-gold-600' : 'text-gray-300'}`}>
                        <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">2</span>
                        <span className="font-medium hidden sm:block">Verification</span>
                    </div>
                    <div className={`w-16 h-0.5 mx-4 ${step >= 3 ? 'bg-gold-600' : 'bg-gray-200'}`} />
                    <div className={`flex items-center gap-2 ${step >= 3 ? 'text-gold-600' : 'text-gray-300'}`}>
                        <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">3</span>
                        <span className="font-medium hidden sm:block">Payment</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {step === 1 && (
                        <div className="p-8">
                            <h2 className="text-2xl font-playfair font-bold text-charcoal-900 mb-6">Shipping Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="text" placeholder="First Name" className="p-3 border border-gray-200 rounded-lg focus:ring-gold-500 focus:border-gold-500 outline-none" />
                                <input type="text" placeholder="Last Name" className="p-3 border border-gray-200 rounded-lg focus:ring-gold-500 focus:border-gold-500 outline-none" />
                                <input type="email" placeholder="Email Address" className="p-3 border border-gray-200 rounded-lg focus:ring-gold-500 focus:border-gold-500 outline-none md:col-span-2" />
                                <input type="text" placeholder="Street Address" className="p-3 border border-gray-200 rounded-lg focus:ring-gold-500 focus:border-gold-500 outline-none md:col-span-2" />
                                <input type="text" placeholder="City" className="p-3 border border-gray-200 rounded-lg focus:ring-gold-500 focus:border-gold-500 outline-none" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="State" className="p-3 border border-gray-200 rounded-lg focus:ring-gold-500 focus:border-gold-500 outline-none" />
                                    <input type="text" placeholder="ZIP" className="p-3 border border-gray-200 rounded-lg focus:ring-gold-500 focus:border-gold-500 outline-none" />
                                </div>
                                <input type="tel" placeholder="Mobile Number" className="p-3 border border-gray-200 rounded-lg focus:ring-gold-500 focus:border-gold-500 outline-none md:col-span-2" />
                            </div>
                            <button
                                onClick={() => setStep(2)}
                                className="w-full mt-8 bg-charcoal-900 text-white py-4 rounded-lg font-medium hover:bg-charcoal-800 transition-colors"
                            >
                                Continue to Verification
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="p-8 text-center max-w-md mx-auto">
                            <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Smartphone className="text-gold-600" size={32} />
                            </div>
                            <h2 className="text-2xl font-playfair font-bold text-charcoal-900 mb-2">Verify Mobile Number</h2>
                            <p className="text-gray-500 mb-8">We sent a 6-digit code to +1 (555) ***-8888</p>

                            <div className="flex gap-2 justify-center mb-8">
                                {[...Array(6)].map((_, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        className="w-12 h-12 text-center text-xl font-bold border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setStep(3)}
                                className="w-full bg-charcoal-900 text-white py-4 rounded-lg font-medium hover:bg-charcoal-800 transition-colors"
                            >
                                Verify & Continue
                            </button>
                            <button onClick={() => setStep(1)} className="mt-4 text-sm text-gray-500 hover:text-charcoal-900">
                                Change Number
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="p-8">
                            <h2 className="text-2xl font-playfair font-bold text-charcoal-900 mb-6">Payment</h2>
                            <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200">
                                <div className="flex items-center gap-4 mb-4">
                                    <CreditCard className="text-charcoal-900" />
                                    <span className="font-medium">Credit Card</span>
                                </div>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Card Number" className="w-full p-3 border border-gray-200 rounded-lg bg-white" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="MM/YY" className="w-full p-3 border border-gray-200 rounded-lg bg-white" />
                                        <input type="text" placeholder="CVC" className="w-full p-3 border border-gray-200 rounded-lg bg-white" />
                                    </div>
                                </div>
                            </div>
                            <button
                                className="w-full bg-gold-500 text-white py-4 rounded-lg font-medium hover:bg-gold-600 transition-colors flex items-center justify-center gap-2 shadow-luxury"
                            >
                                <ShieldCheck size={20} />
                                PAY SECURELY
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
