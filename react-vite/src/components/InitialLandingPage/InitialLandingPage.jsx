import React from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { thunkLogin } from "../../redux/session";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './InitialLandingPage.css';

const InitialLandingPage = () => {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();

    const openLoginModal = () => {
        setModalContent(<LoginFormModal />);
    };

    const openSignupModal = () => {
        setModalContent(<SignupFormModal />);
    };

    // TODO: Consider adding error handling for the demo login function
    const handleDemoLogin = async () => {
        // Placeholder: Add logging for demo login attempts
        await dispatch(
            thunkLogin({
                email: "demo@aa.io",
                password: "password",
            })
        );
    };

    return (
        <div className="landing-page">
            {/* Header */}
            <header className="landing-header">
                <h1 className="landing-logo">Anchor</h1>
                <div className="header-buttons">
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

            {/* Main Content */}
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
                        // Map each feature object to a feature card
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

export default InitialLandingPage;