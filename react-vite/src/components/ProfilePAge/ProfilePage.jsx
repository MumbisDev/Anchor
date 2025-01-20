import React from 'react';
import { useSelector } from 'react-redux';
import './ProfilePage.css';

const ProfilePage = () => {
    const user = useSelector(state => state.session.user) || {};
    
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="profile-container">
            <main className="main-content">
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            <div className="avatar-circle">
                                <svg 
                                    width="60" 
                                    height="60" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="#e0e0e0" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                                    <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                        </div>
                        <div className="profile-names">
                            <h1>{user?.username || 'User'}</h1>
                            <span className="username">@{(user?.username || 'user').toLowerCase()}</span>
                        </div>
                    </div>
                    <button className="edit-profile-button">
                        Edit Profile
                    </button>
                </div>

                {/* Rest of the component remains the same */}
                <div className="settings-section">
                    <h2>Account Settings</h2>
                    <div className="settings-grid">
                        <div className="setting-item">
                            <span className="setting-label">Email</span>
                            <span className="setting-value">{user?.email || 'N/A'}</span>
                        </div>
                        <div className="setting-item">
                            <span className="setting-label">Username</span>
                            <span className="setting-value">{user?.username || 'N/A'}</span>
                        </div>
                        <div className="setting-item">
                            <span className="setting-label">Time Zone</span>
                            <span className="setting-value">UTC-8 (Pacific Time)</span>
                        </div>
                        <div className="setting-item">
                            <span className="setting-label">Member Since</span>
                            <span className="setting-value">{formatDate(user?.created_at)}</span>
                        </div>
                    </div>
                </div>

                <div className="settings-section">
                    <h2>Preferences</h2>
                    <div className="settings-grid">
                        <div className="setting-item">
                            <span className="setting-label">Theme</span>
                            <div className="setting-toggle">Dark</div>
                        </div>
                        <div className="setting-item">
                            <span className="setting-label">Notifications</span>
                            <div className="setting-toggle">On</div>
                        </div>
                    </div>
                </div>

                <div className="settings-section">
                    <h2>Privacy</h2>
                    <div className="settings-grid">
                        <div className="setting-item">
                            <span className="setting-label">Profile Visibility</span>
                            <div className="setting-toggle">Private</div>
                        </div>
                        <div className="setting-item">
                            <span className="setting-label">Share Statistics</span>
                            <div className="setting-toggle">Friends</div>
                        </div>
                        <div className="setting-item">
                            <span className="setting-label">Activity Status</span>
                            <div className="setting-toggle">Show</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;