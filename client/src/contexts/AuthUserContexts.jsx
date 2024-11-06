// AuthUserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import BookLoader from '../components/BookLoader';

const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/auth/check-auth`, {
          withCredentials: true,
        });

        if (response.data.isAuthenticated) {
          const userData = {
            userId: response.data.userId,
            first_name: response.data.first_name,
            profilePic: response.data.profilePic,
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          setIsAuthenticated(true);
        } else {
          const userDataFromStorage = localStorage.getItem('user');
          if (userDataFromStorage) {
            setUser(JSON.parse(userDataFromStorage));
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
  
  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
      localStorage.clear();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthUserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, loading, updateUser, login, logout }}>
      {loading ? <BookLoader /> : children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUser = () => useContext(AuthUserContext);

export default AuthUserContext;