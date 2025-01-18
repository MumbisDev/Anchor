import React from 'react';
import Navigation from '../Navigation';
import ProfileButton from '../Navigation/ProfileButton';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            {/* Header */}
            <header className="header">
                <h1>Anchor</h1>
                <ProfileButton />
            </header>

            {/* Navigation */}
            <Navigation />

            {/* Main Content */}
            <main className="main-content">
                {/* Level Progress */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '35%' }}>
                            <span className="progress-text">Level 12 - 1250/2000 XP</span>
                        </div>
                    </div>
                </div>

                {/* Compound Rate */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '25%' }}>
                            <span className="progress-text">Compound Rate: 25%</span>
                        </div>
                    </div>
                </div>

                {/* Habits List */}
                <div className="habits-container">
                    <div className="habits-header">
                        <h2>Active Habits</h2>
                        <button className="add-habit-btn">
                            <span>+</span>
                        </button>
                    </div>
                    
                    <div className="habits-list">
                        <div className="habit-item">
                            <span className="habit-name">Daily Meditation</span>
                            <span className="habit-count">×15</span>
                            <button className="habit-menu">...</button>
                        </div>
                        
                        <div className="habit-item">
                            <span className="habit-name">Coding Practice</span>
                            <span className="habit-count">×8</span>
                            <button className="habit-menu">...</button>
                        </div>
                        
                        <div className="habit-item">
                            <span className="habit-name">Reading</span>
                            <span className="habit-count">×5</span>
                            <button className="habit-menu">...</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;