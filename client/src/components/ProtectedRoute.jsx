import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/authContexts';
import LoginModal from './LoginModal'; // Assuming you have a login modal component

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        // Option 1: Redirect to login page
        // return <Navigate to="/login" />;

        // Option 2: Show login/signup modal
        return <LoginModal />;
    }

    return children;
};

export default ProtectedRoute;
