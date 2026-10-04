import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in (e.g. validate token)
        // For simplicity, we'll just check if token exists and maybe fetch profile
        const token = localStorage.getItem('access_token');
        if (token) {
            // Ideally fetch user profile here
            // api.get('auth/me').then(res => setUser(res.data)).catch(...)
            setUser({ isAuthenticated: true }); // Placeholder
        }
        setLoading(false);
    }, []);

    const requestOTP = async (phoneNumber) => {
        const response = await api.post('auth/otp/request/', { phone_number: phoneNumber });
        console.log('OTP Response:', response.data); // Debugging: View OTP in console
        return response.data;
    };

    const verifyOTP = async (phoneNumber, otpCode) => {
        const response = await api.post('auth/otp/verify/', { phone_number: phoneNumber, otp_code: otpCode });
        const { access, user } = response.data;
        localStorage.setItem('access_token', access);
        setUser(user);
        return user;
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, requestOTP, verifyOTP, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
