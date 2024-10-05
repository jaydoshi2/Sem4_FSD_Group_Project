import React from 'react';
import { Link } from 'react-router-dom';

const LoginModal = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Please Login or Sign Up</h2>
                <p className="mb-4">You must be logged in to access this page.</p>
                <div className="flex justify-end">
                    <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                        Login
                    </Link>
                    <Link to="/signup" className="bg-gray-500 text-white px-4 py-2 rounded-md">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
