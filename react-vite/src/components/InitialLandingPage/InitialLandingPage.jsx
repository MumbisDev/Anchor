import React from 'react';
import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './InitialLandingPage.css';
const InitialLandingPage = () => {
    const { setModalContent } = useModal();

    const openLoginModal = () => {
        setModalContent(<LoginFormModal />);
    };

    const openSignupModal = () => {
        setModalContent(<SignupFormModal />);
    };

    return (
        <div className="landing-page">
            {/* Header */}
            <header className="landing-header">
                <h1 className="landing-logo">Anchor</h1>
                <button 
                    onClick={openLoginModal}
                    className="sign-in-button"
                >
                    Sign in
                </button>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {/* Hero Section */}
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
                    >
                        Get Started
                    </button>
                </div>

                {/* Feature Grid */}
                <div className="feature-grid">
                    {[
                        {
                            title: "Track Progress",
                            description: "Monitor your habits with intuitive streak tracking"
                        },
                        {
                            title: "Level Up",
                            description: "Transform habits into achievements with XP system"
                        },
                        {
                            title: "Stay Consistent",
                            description: "Build momentum with compound tracking"
                        }
                    ].map((feature, index) => (
                        <div key={index} className="feature-card">
                            <h3 className="feature-title">
                                {feature.title}
                            </h3>
                            <p className="feature-description">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default InitialLandingPage;
