import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(() => localStorage.getItem('user-role') || 'student');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // In a real app, we would verify the token here
            const savedUser = JSON.parse(localStorage.getItem('user'));
            if (savedUser) {
                setUser(savedUser);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('user-role', role);
    }, [role]);

    const login = async (email, password, userRole = 'student') => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const userData = { ...data.user, role: userRole };
                setUser(userData);
                setRole(userRole);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(userData));
                setLoading(false);
                return { success: true };
            } else {
                setError(data.msg || 'Login failed');
                setLoading(false);
                return { success: false, message: data.msg };
            }
        } catch (err) {
            setError('Server error, please try again later');
            setLoading(false);
            return { success: false, message: 'Server error' };
        }
    };

    const signup = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                setLoading(false);
                return { success: true };
            } else {
                setError(data.msg || 'Signup failed');
                setLoading(false);
                return { success: false, message: data.msg };
            }
        } catch (err) {
            setError('Server error, please try again later');
            setLoading(false);
            return { success: false, message: 'Server error' };
        }
    };

    const verifyOTP = async (email, otp, userRole = 'student') => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, role: userRole }),
            });

            const data = await response.json();

            if (response.ok) {
                const userData = { ...data.user, role: userRole };
                setUser(userData);
                setRole(userRole);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(userData));
                setLoading(false);
                return { success: true };
            } else {
                setError(data.msg || 'OTP verification failed');
                setLoading(false);
                return { success: false, message: data.msg };
            }
        } catch (err) {
            setError('Server error, please try again later');
            setLoading(false);
            return { success: false, message: 'Server error' };
        }
    };

    const requestOTP = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/auth/request-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setLoading(false);
                return { success: true };
            } else {
                setError(data.msg || 'Failed to request OTP');
                setLoading(false);
                return { success: false, message: data.msg };
            }
        } catch (err) {
            setError('Server error, please try again later');
            setLoading(false);
            return { success: false, message: 'Server error' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, role, setRole, login, signup, requestOTP, verifyOTP, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
