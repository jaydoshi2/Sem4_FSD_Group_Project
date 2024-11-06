// authContexts.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/auth/check-auth`, {
                    withCredentials: true,
                });
                if (response.data.isAuthenticated) {
                    setUser({
                        userId: response.data.userId,
                        first_name: response.data.first_name,
                        profilePic: response.data.profilePic,
                    });
                    setIsAuthenticated(true);
                } else {
                    const userDataFromStorage = localStorage.getItem('user');
                    console.log("USER FROM LOCAL BY GOOGLE LOGIN ",userDataFromStorage)
                    if (userDataFromStorage) {
                        const parsedUser = JSON.parse(userDataFromStorage);
                        setUser(parsedUser);
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                        localStorage.clear();
                    }
                }
            } catch (error) {
                console.error('Error fetching user data', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [BACKEND_URL]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;