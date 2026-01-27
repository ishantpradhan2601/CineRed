import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    const { searchQuery, setSearchQuery } = useSearch();
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container nav-content">
                <Link to="/" className="logo" onClick={closeMobileMenu}>Cine<span>Red</span></Link>

                {!isAuthPage && user && (
                    <>
                        <ul className={`nav-links ${mobileMenuOpen ? 'nav-active' : ''}`}>
                            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMobileMenu}>Home</Link></li>
                            <li><Link to="/movies" className={location.pathname === '/movies' ? 'active' : ''} onClick={closeMobileMenu}>Movies</Link></li>
                            <li><Link to="/trending" className={location.pathname === '/trending' ? 'active' : ''} onClick={closeMobileMenu}>Trending</Link></li>
                            <li><a href="#footer" onClick={closeMobileMenu}>Contact</a></li>
                        </ul>

                        <div className="nav-actions">
                            <div className={`search-container ${searchBarOpen ? 'search-active' : ''}`}>
                                <input
                                    type="text"
                                    placeholder="Search movies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                                <button className="nav-search-btn" onClick={() => setSearchBarOpen(!searchBarOpen)}>
                                    <Search size={20} />
                                </button>
                            </div>
                            <div className="user-menu hide-mobile">
                                <Link to="/profile" className={`user-profile-btn ${location.pathname === '/profile' ? 'active' : ''}`} title={user.displayName}>
                                    <User size={20} />
                                    <span>{user.displayName?.split(' ')[0] || 'Profile'}</span>
                                </Link>
                            </div>
                        </div>
                    </>
                )}

                <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
