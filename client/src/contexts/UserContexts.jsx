import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import BookLoader from '../components/BookLoader';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const myIP = import.meta.env.VITE_MY_IP;
      try {
        const response = await axios.get(`http://${myIP}:3000/auth/check-auth`, {
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
  }, []);
  
  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };
  if (loading) return <BookLoader/>
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, loading, updateUser, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);