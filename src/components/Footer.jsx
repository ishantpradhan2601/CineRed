import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <Link to="/" className="logo">Cine<span>Red</span></Link>
                    <p>Bringing you the best of cinema, one story at a time. Experience entertainment like never before.</p>
                </div>
                <div className="footer-links">
                    <h3>Explore</h3>
                    <ul>
                        <li><Link to="/movies">New Releases</Link></li>
                        <li><Link to="/">Top Rated</Link></li>
                        <li><Link to="/trending">Coming Soon</Link></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <h3>Connect</h3>
                    <div className="social-icons">
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} CineRed. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
