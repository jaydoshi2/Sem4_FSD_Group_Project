// ProtectedRoute.jsx
import React, { useContext } from 'react';
import LoginModal from './LoginModal';
import { useAuthUser } from '../contexts/AuthUserContexts';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthUser();

    // if(localStorage.getItem('user')){
    //     isAuthenticated=true;
    // }

    if (!isAuthenticated) {
        return <LoginModal />;
    }

    return children;
};

export default ProtectedRoute;