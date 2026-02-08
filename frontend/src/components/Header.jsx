import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <header className="header">
            <div className="header-container">

                <div className="header-logo">
                    <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 32 32" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                        <circle 
                        cx="16" 
                        cy="16" 
                        r="14" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        />

                        <path d="M12 16h8M16 12v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="logo-text"><a href="/">JobHub</a></span>
                </div>

                <nav className="header-nav">
                    <a href="/" className="nav-link">Home</a>
                    <a href="#jobs" className="nav-link">Jobs</a>
                    <a href="#companies" className="nav-link">Companies</a>
                    <a href="#about" className="nav-link">About</a>
                </nav>

                <div className="header-actions">
                    <button className="btn-secondary">Recruter Sign In</button>
                    <button className="btn-primary">Log In</button>
                </div>
            </div>
        </header>
    );
};

export default Header;