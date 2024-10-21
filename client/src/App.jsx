import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Chatbot from './components/ChatBot';
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './components/ResetPassword';
import { AuthUserProvider } from './contexts/AuthUserContexts';
import AboutPage from './pages/AboutPage';
import AdminDashboard from './pages/AdminPage';
import Certificate from './pages/Certificate';
import ContactSection from './pages/ContactSection';
import Course from './pages/Course';
import CourseDetails from './pages/CourseDetails';
import CourseDisplay from './pages/CourseDisplay';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import LeaderBoard from './pages/LeaderBoard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Signup from './pages/SignUp';
import Skills from './pages/Skills';
import UserCoursesPage from './pages/UserCourse';
import VideoPage from './pages/VideoPage';

const App = () => {
        const location = useLocation();

        // Define paths where the NavBar should be hidden
        const hideNavBarPaths = [
                '/login',
                '/signup',
                '/forgot-password',
                '/reset-password'
        ];

        // Check if current path should hide navbar/footer
        const shouldHideNavBar = () => {
                // Check if it matches any of the specific paths
                const isHiddenPath = hideNavBarPaths.some(path =>
                        location.pathname.startsWith(path)
                );

                // Check if it's a valid route by matching against all defined routes
                const validRoutes = [
                        '/',
                        '/contact',
                        '/chatbot',
                        '/home',
                        '/Home1',
                        '/course',
                        '/skill',
                        '/aboutpage',
                        '/certificate',
                        '/admin',
                        '/courseDetails',
                        '/profile',
                        '/leaderBoard',
                        '/video',
                        '/my-courses'
                ];

                const isValidRoute = validRoutes.some(route =>
                        location.pathname == route
                );

                // Hide navbar if it's either a hidden path OR not a valid route (404)
                return isHiddenPath || !isValidRoute;
        };

        const hideNavBar = shouldHideNavBar();

        return (
                <AuthUserProvider>
                        <div className="relative">
                                {!hideNavBar && <NavBar />}
                                <Chatbot />
                                <Routes>
                                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                                        <Route path="/contact" element={<ContactSection />} />
                                        <Route path="/chatbot" element={<Chatbot />} />
                                        <Route path='/forgot-password' element={<ForgotPassword />} />
                                        <Route path="/" element={<Home />} />
                                        <Route path="/Home1" element={<Course />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path='/signup' element={<Signup />} />
                                        <Route path='/home' element={<Home />} />
                                        <Route path="/course" element={<CourseDisplay />} />
                                        <Route path="/skill" element={<Skills />} />
                                        <Route path='/aboutpage' element={<AboutPage />} />

                                        <Route path="/certificate/:courseId" element={
                                                <ProtectedRoute>
                                                        <Certificate />
                                                </ProtectedRoute>
                                        } />
                                        <Route path="/admin/*" element={<AdminDashboard />} />

                                        {/* Protected Routes */}
                                        <Route
                                                path="/courseDetails/"
                                                element={
                                                        <ProtectedRoute>
                                                                <CourseDetails />
                                                        </ProtectedRoute>
                                                }
                                        />
                                        <Route
                                                path="/profile"
                                                element={
                                                        <ProtectedRoute>
                                                                <Profile />
                                                        </ProtectedRoute>
                                                }
                                        />
                                        <Route
                                                path="/leaderBoard"
                                                element={
                                                        <ProtectedRoute>
                                                                <LeaderBoard />
                                                        </ProtectedRoute>
                                                }
                                        />
                                        <Route path="/video" element={
                                                <ProtectedRoute>
                                                        <VideoPage />
                                                </ProtectedRoute>
                                        } />
                                        <Route path="/my-courses" element={
                                                <ProtectedRoute>
                                                        <UserCoursesPage />
                                                </ProtectedRoute>
                                        } />
                                        {/* 404 Not Found Route - Keep this last */}
                                        <Route path="*" element={<NotFound />} />
                                </Routes>
                                {!hideNavBar && <Footer />}

                        </div>
                </AuthUserProvider >
        );
};

export default App;