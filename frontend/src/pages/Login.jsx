import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('PHONE'); // PHONE or OTP
    const [error, setError] = useState('');
    const { requestOTP, verifyOTP } = useAuth();
    const navigate = useNavigate();

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await requestOTP(phoneNumber);
            setStep('OTP');
        } catch (err) {
            setError('Failed to send OTP. Please check the number.');
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await verifyOTP(phoneNumber, otp);
            navigate('/');
        } catch (err) {
            setError('Invalid OTP. Please try again.');
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-luxury rounded-xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-serif font-bold text-charcoal">
                        {step === 'PHONE' ? 'Welcome Back' : 'Verify OTP'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {step === 'PHONE'
                            ? 'Enter your phone number to access your account'
                            : `Enter the code sent to ${phoneNumber}`
                        }
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                        {error}
                    </div>
                )}

                {step === 'PHONE' ? (
                    <form className="mt-8 space-y-6" onSubmit={handleRequestOTP}>
                        <div>
                            <label htmlFor="phone" className="sr-only">Phone Number</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gold focus:border-gold focus:z-10 sm:text-sm"
                                placeholder="Phone Number (e.g. +1234567890)"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Send Code
                        </Button>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleVerifyOTP}>
                        <div>
                            <label htmlFor="otp" className="sr-only">OTP Code</label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gold focus:border-gold focus:z-10 sm:text-sm text-center tracking-widest text-xl"
                                placeholder="123456"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Verify & Login
                        </Button>
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setStep('PHONE')}
                                className="text-sm text-gold hover:text-charcoal"
                            >
                                Change Phone Number
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
