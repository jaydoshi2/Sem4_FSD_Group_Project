// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AuthWrapper = ({ children }) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const response = await axios.get("http://localhost:3000/auth/check-auth", { withCredentials: true });
//                 console.log(response)
//                 if (!response.data.isAuthenticated) {
//                     navigate("/Login");
//                 } else {
//                     localStorage.setItem("user", JSON.stringify(response.data.user));
//                     setIsLoading(false);
//                 }
//             } catch (error) {
//                 console.error("Auth check failed", error);
//                 navigate("Login");
//             }
//         };

//         checkAuth();
//     }, [navigate]);

//     if (isLoading) {
//         return <div>Auth Wrapper Loading...</div>;
//     }

//     return children;
// };

// export default AuthWrapper;