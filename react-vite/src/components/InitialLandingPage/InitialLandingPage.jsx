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

    const handleDemoLogin = async () => {
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
                    <button 
                        onClick={handleDemoLogin}
                        className="demo-button"
                    >
                        Demo User
                    </button>
                    <button 
                        onClick={openLoginModal}
                        className="sign-in-button"
                    >
                        Sign in
                    </button>
                </div>
            </header>

            {/* Rest of your component remains the same */}
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
                    >
                        Get Started
                    </button>
                </div>

                <div className="feature-grid">
                    {[
                        {
                            title: "Track Progress",
                            description: "Monitor your habits with intuitive streak tracking"
                        },
                        {
                            title: "Level Up",
                            description: "Real time progression for every habit you track"
                        },
                        {
                            title: "Stay Consistent",
                            description: "Ease of use and responsiveness allows you to easily stay consistent"
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