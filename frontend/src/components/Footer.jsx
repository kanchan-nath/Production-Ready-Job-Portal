import React from 'react';
import '../styles/Footer.css';


const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3 className="footer-title">JobHub</h3>
                        <p className="footer-description">
                            Find your dream job and connect with top employers worldwide.
                        </p>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-heading">For Job Seekers</h4>
                        <ul className="footer-links">
                            <li><a href="#browse">Browse Jobs</a></li>
                            <li><a href="#companies">Search Companies</a></li>
                            <li><a href="#salaries">Salary Guide</a></li>
                            <li><a href="#resources">Resources</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-heading">For Employers</h4>
                        <ul className="footer-links">
                            <li><a href="#post">Post a Job</a></li>
                            <li><a href="#pricing">Pricing</a></li>
                            <li><a href="#recruiting">Recruiting Tips</a></li>
                            <li><a href="#contact">Contact Sales</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-heading">Company</h4>
                        <ul className="footer-links">
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#blog">Blog</a></li>
                            <li><a href="#careers">Careers</a></li>
                            <li><a href="#press">Press</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-heading">Follow Us</h4>
                        <div className="social-links">
                            <a href="#linkedin" className="social-icon" aria-label="LinkedIn">in</a>
                            <a href="#twitter" className="social-icon" aria-label="Twitter">𝕏</a>
                            <a href="#facebook" className="social-icon" aria-label="Facebook">f</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-legal">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                        <a href="#cookies">Cookie Settings</a>
                    </div>
                    <div className="footer-copyright">
                        <p>&copy; {currentYear} JobHub. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;