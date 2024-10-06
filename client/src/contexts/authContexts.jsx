import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const myIP = import.meta.env.VITE_MY_IP;

    useEffect(() => {
        const fetchUserData = async () => {
            console.log("authcontect called")
            try {
                    const response = await axios.get(`http://${myIP}:3000/auth/check-auth`, {
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
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error('Error fetching user data', error);
                    setIsAuthenticated(false);
                }
        };

        fetchUserData();
    }, [myIP]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
