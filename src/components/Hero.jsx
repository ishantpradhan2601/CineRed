import React from 'react';
import { Play, Info } from 'lucide-react';

const Hero = () => {
    return (
        <section id="hero" className="hero">
            <div className="hero-bg">
                <img src="/assets/images/hero.png" alt="Cinematic Background" />
                <div className="hero-overlay"></div>
            </div>
            <div className="container hero-content">
                <h1 className="fade-in appear">Experience The <span>Future</span> Of Cinema</h1>
                <p className="fade-in appear">Join millions of movie lovers and discover the most breathtaking stories ever told on screen.</p>
                <div className="hero-cta fade-in appear">
                    <button className="btn btn-primary"><Play size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Explore </button>
                    <button className="btn btn-outline"><Info size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Learn More</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
