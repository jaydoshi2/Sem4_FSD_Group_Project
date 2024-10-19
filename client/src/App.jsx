import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { default as Chatbot, default as ChatbotComponent } from './components/ChatBot';
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import ResetPassword from './components/ResetPassword';
import AboutPage from './pages/AboutPage';
import ContactSection from './pages/ContactSection';
import Course from './pages/Course';
import CourseDetails from './pages/CourseDetails';
import CourseDisplay from './pages/CourseDisplay';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import LeaderBoard from './pages/LeaderBoard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/SignUp';
import Skills from './pages/Skills';
import UserCoursesPage from './pages/UserCourse';
import VideoPage from './pages/VideoPage';
import Certificate from './pages/Certificate';
import AdminDashboard from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound'; // Import the NotFound component
import { UserProvider } from './contexts/UserContexts';
import { AuthUserProvider } from './contexts/AuthUserContexts';

const App = () => {
        const location = useLocation();

        // Define paths where the NavBar should be hidden
        const hideNavBarPaths = [
                '/login',
                '/signup',
                '/forgot-password',
                '/reset-password/:token',
                '/*'
        ];

        // Check if the current path is in the list of paths where the NavBar should be hidden
        const hideNavBar = hideNavBarPaths.some(path => location.pathname.startsWith(path));

        return (
                <AuthUserProvider>
                <div className="App">
                        <Chatbot />
                        {!hideNavBar && <NavBar />}
                        <Routes>
                                <Route path="/reset-password/:token" element={<ResetPassword />} />
                                <Route path="/contact" element={<ContactSection />} />
                                <Route path="/chatbot" element={<ChatbotComponent />} />
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
                                {/* 404 Not Found Route */}
                                <Route path="*" element={<NotFound />} />
                                <Route path="/my-courses" element={
                                        <ProtectedRoute>
                                                <UserCoursesPage />
                                        </ProtectedRoute>
                                } />
                        </Routes>
                        {!hideNavBar && <Footer />}
                </div>
                </AuthUserProvider>
        );
};

export default App;
