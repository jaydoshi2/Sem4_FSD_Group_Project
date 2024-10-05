// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    // const accessToken =localStorage.getItem('user');
    const isAuthenticated = userData;
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
                                                                            