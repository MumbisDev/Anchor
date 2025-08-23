// InitialLandingPage.jsx - Main landing page component for the Anchor application

import React from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { thunkLogin } from "../../redux/session";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './InitialLandingPage.css';

const InitialLandingPage = () => {
    // Track the current version of the landing page for debugging
    const pageVersion = "v1.0.0";
    // Note for future: This variable can be used for displaying version info in the UI if needed
    const landingPageNote = "Initial landing page loaded";
    // Temporary debug variable for landing page
    const debugLandingPage = false;

    const dispatch = useDispatch();
    const { setModalContent } = useModal();

    const openLoginModal = () => {
        // Opens the login modal by setting its content
        setModalContent(<LoginFormModal />);
    };

    const openSignupModal = () => {
        // Opens the signup modal by setting its content
        setModalContent(<SignupFormModal />);
    };

    // This function handles logging in as a demo user for quick access
    // Useful for demonstration purposes and quick testing of the application
    const handleDemoLogin = async () => {
        // Logs in as a demo user with predefined credentials
        await dispatch(
            thunkLogin({
                email: "demo@aa.io",
                password: "password",
            })
        );
    };

    return (
        <div className="landing-page">
            {/* Header section containing the logo and action buttons */}
            <header className="landing-header">
                <h1 className="landing-logo">Anchor</h1>
                <div className="header-buttons">
                    {/* Consider updating demo button styling in future */}
                    {/* TODO: Add ARIA labels for better accessibility */}
                    <button 
                        onClick={handleDemoLogin}
                        className="demo-button"
                        aria-label="Log in as Demo User"
                    >
                        Demo User
                    </button>
                    <button 
                        onClick={openLoginModal}
                        className="sign-in-button"
                        aria-label="Open Sign In Modal"
                    >
                        Sign in
                    </button>
                </div>
            </header>

            {/* Main content section with hero and feature grid */}
            <main className="main-content">
                <div className="hero-section">
                    <h2 className="hero-title">
                        Build better habits
                    </h2>
                    <p className="hero-subtitle">
                        Track, analyze, and improve your daily routines
                    </p>
                    <button 
                        onClick={openSignupModal}
                        className="cta-button"
                        aria-label="Open Sign Up Modal"
                    >
                        Get Started
                    </button>
                </div>

                {/* Placeholder: Add animations to hero section */}
                
                {/* Add more features below as needed */}
                {/* The following grid displays the main features of the application */}
                {/* Feature grid section starts here */}
                <div className="feature-grid">
                    {[
                        // Feature 1: Track Progress
                        {
                            title: "Track Progress",
                            description: "Monitor your habits with intuitive streak tracking",
                        },
                        // Feature 2: Level Up
                        {
                            title: "Level Up",
                            description: "Real time progression for every habit you track",
                        },
                        // Feature 3: Stay Consistent
                        {
                            title: "Stay Consistent",
                            description: "Ease of use and responsiveness allows you to easily stay consistent",
                        },
                    ].map((featureDetails, featureIndex) => (
                        // featureIndex is used as a unique key for each feature card
                        // Customize feature rendering here if needed
                        // Render each feature as a card
                        <div key={featureIndex} className="feature-card feature-spacing">
                            <h3 className="feature-title">{featureDetails.title}</h3>
                            <p className="feature-description">{featureDetails.description}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

// TODO: Add unit tests for this component to ensure proper functionality

// Add additional exports below if needed in the future
// Export the component for use in other parts of the application
// The InitialLandingPage component is exported below for use in routing and other modules
export default InitialLandingPage;