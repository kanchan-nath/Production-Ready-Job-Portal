import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const ADMIN_EMAILS = ["kanchan.nath.act@gmail.com"]; // list of allowed admin emails

const Header = () => {
    const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();
    const navigate = useNavigate();

    const handleAdminLogin = async () => {
        await loginWithRedirect();
    };

    // Redirect admin to /admin after login
    useEffect(() => {
        if (!isLoading && isAuthenticated && user && ADMIN_EMAILS.includes(user.email)) {
            navigate('/admin');
        }
    }, [isAuthenticated, isLoading, user, navigate]);

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo">
                    <span className="logo-text"><a href="/">JobHub</a></span>
                </div>

                <nav className="header-nav">
                    <a href="/" className="nav-link">Home</a>
                    <a href="#jobs" className="nav-link">Jobs</a>
                    <a href="#companies" className="nav-link">Companies</a>
                    <a href="#about" className="nav-link">About</a>
                </nav>

                <div className="header-actions">
                    {!isAuthenticated ? (
                        <button
                            className="btn-secondary"
                            onClick={handleAdminLogin}
                        >
                            Recruiter Sign In
                        </button>
                    ) : (
                        <>
                            {ADMIN_EMAILS.includes(user.email) ? (
                                <button
                                    className="btn-primary"
                                    onClick={() =>
                                        logout({ logoutParams: { returnTo: window.location.origin } })
                                    }
                                >
                                    Log Out
                                </button>
                            ) : (
                                <span style={{ color: 'red', fontWeight: 'bold' }}>
                                    You are not authorized
                                </span>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
