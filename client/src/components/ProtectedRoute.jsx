// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/authContexts';
import LoginModal from './LoginModal';

const ProtectedRoute = ({ children }) => {
    var { isAuthenticated, loading } = useContext(AuthContext);

    if(localStorage.getItem('user')){
        isAuthenticated=true;
    }

    if (!isAuthenticated) {
        return <LoginModal />;
    }

    return children;
};

export default ProtectedRoute;