import axios from 'axios';
import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi'; // Icons for mobile menu toggle
import { Link, useNavigate } from 'react-router-dom';
import webLogo from '../assets/images/myimg.png'; // Adjust path if necessary
import { useUser } from '../contexts/UserContexts';
import BookLoader from './BookLoader';
const NavBar = () => {
    const navigate = useNavigate();
    const myIP = import.meta.env.VITE_MY_IP;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const { user, isAuthenticated, setIsAuthenticated, loading, setUser } = useUser();
    console.log("NAVBAR IS AUTHENTICATED ", isAuthenticated)
    //     useEffect(() => {
    //     setloader(true)
    //         const fetchUserData = async () => {
    //             try {
    //                 console.log("in try block")
    //                 const response = await axios.get(`http://${myIP}:3000/auth/check-auth`, {
    //                     withCredentials: true,
    //                 });

    //     // Check if manual login is authenticated
    //     if (response.data.isAuthenticated) {
    //         const userData = {
    //             userId: response.data.userId,
    //             first_name: response.data.first_name,
    //             profilePic: response.data.profilePic,
    //         };
    //         setUser(userData);
    //         console.log("/////////* ", userData)
    //         localStorage.setItem('user', JSON.stringify(userData));
    //         setIsAuthenticated(true);
    //         setloader(false)
    //     } else {
    //         console.log('Manual login not authenticated, checking Google login...');

    //         // Check if there is data stored in localStorage
    //         const userDataFromStorage = localStorage.getItem('user');

    //         if (userDataFromStorage) {
    //             // If user data exists in localStorage, set it to state
    //             const parsedUser = JSON.parse(userDataFromStorage);
    //             setUser(parsedUser);
    //             setIsAuthenticated(true);
    //             setloader(false)
    //         } else {
    //             // No user data in localStorage, redirect to login
    //             setIsAuthenticated(false);
    //             localStorage.clear()
    //             setloader(false)
    //         }
    //     }
    // } catch (error) {
    //     console.error('Error fetching user data', error);
    //     setIsAuthenticated(false);
    // }
    //         };

    // fetchUserData();
    //     }, [myIP]);

    const logout = () => {
        setLoader(true)
        axios
            .post(`http://${myIP}:3000/auth/logout`, {}, { withCredentials: true })
            .then(() => {
                localStorage.clear();
                setUser(null);
                setIsAuthenticated(false);
                navigate('/');
                setLoader(false)
            })
            .catch((error) =>
                console.error('Logout failed', error))

    };

    if (loading || loader) return <BookLoader />

    return (
        <header className="fixed top-0 left-0 w-full bg-blue-950 shadow-md z-50">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center h-16 max-w-full">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img
                        src={webLogo}
                        alt="Logo"
                        className="h-20 w-24 filter grayscale p-2"
                        style={{ filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(100deg)' }} // Adjust the filter as needed
                    />

                    <h1 className="text-white font-bold text-xl sm:text-2xl ml-2 sm:ml-3">
                        Skill-Bridge
                    </h1>
                </Link>

                {/* Menu Icon (Visible on screens < 768px) */}
                <div className="block md:hidden"> {/* Change from sm:hidden to md:hidden */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white focus:outline-none"
                    >
                        {isMenuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
                    </button>
                </div>

                {/* Desktop Menu (Visible on screens >= 768px) */}
                <nav className="hidden md:flex md:items-center md:space-x-8"> {/* Changed from sm to md */}
                    <Link to="/" className="text-white hover:text-gray-200">Home</Link>
                    <Link to="/aboutpage" className="text-white hover:text-gray-200">About</Link>
                    <Link to="/course" className="text-white hover:text-gray-200">Courses</Link>
                    <Link to="/contact" className="text-white hover:text-gray-200">Contact</Link>
                    <Link to="/leaderBoard" className="text-white hover:text-gray-200">LeaderBoard</Link>

                    {isAuthenticated && user ? (
                        <div className="relative">
                            <img
                                src={user.profilePic}
                                alt="Profile"
                                className="h-10 w-10 rounded-full cursor-pointer border-2 border-white"
                                onClick={() => setDropdownVisible(!dropdownVisible)}
                            />
                            {dropdownVisible && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg">
                                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                                    <Link to="/my-courses" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Courses</Link>
                                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-gray-100">Login / Sign Up</Link>
                    )}
                </nav>
            </div>

            {/* Mobile Menu (Appears when isMenuOpen is true) */}
            {isMenuOpen && (
                <div className="md:hidden bg-blue-800 w-full"> {/* Change from sm:hidden to md:hidden */}
                    <nav className="flex flex-col items-center space-y-4 py-4">
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gray-200">Home</Link>
                        <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gray-200">About</Link>
                        <Link to="/course" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gray-200">Courses</Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gray-200">Contact</Link>
                        <Link to="/leaderBoard" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gray-200">LeaderBoard</Link>

                        {isAuthenticated && user ? (
                            <div className="flex flex-col items-center">
                                <img
                                    src={user.profilePic}
                                    alt="Profile"
                                    className="h-10 w-10 rounded-full mb-2 border-2 border-white"
                                />
                                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gray-200">Profile</Link>
                                <Link to="/my-courses" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gray-200">My Courses</Link>
                                <button onClick={logout} className="text-white hover:text-gray-200">Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-gray-100">Login / Sign Up</Link>
                        )}
                    </nav>
                </div>
            )}
        </header>

    );

};

export default NavBar;