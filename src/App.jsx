import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Trending from './pages/Trending';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <SearchProvider>
                    <ScrollToTop />
                    <div className="app">
                        <Navbar />
                        <main>
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />

                                {/* Protected Routes */}
                                <Route path="/" element={
                                    <ProtectedRoute>
                                        <Home />
                                    </ProtectedRoute>
                                } />
                                <Route path="/movies" element={
                                    <ProtectedRoute>
                                        <Movies />
                                    </ProtectedRoute>
                                } />
                                <Route path="/trending" element={
                                    <ProtectedRoute>
                                        <Trending />
                                    </ProtectedRoute>
                                } />
                                <Route path="/movie/:id" element={
                                    <ProtectedRoute>
                                        <MovieDetails />
                                    </ProtectedRoute>
                                } />
                                <Route path="/profile" element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                } />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </SearchProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
