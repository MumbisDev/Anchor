// File: src/components/ProfilePAge/ProfilePage.jsx

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkUpdateUser } from '../../redux/session';
import './ProfilePage.css';

// Configuration constants
// Default display name for users without a username
const DEFAULT_USER_DISPLAY = 'User';
// Default username handle if username is missing
const DEFAULT_USERNAME_FALLBACK = 'user';

// Options for formatting the user's join date
const DATE_FORMAT_OPTIONS = {
    month: 'long',
    year: 'numeric'
};
const AVATAR_SIZE = 60;

/**
 * ProfilePage Component
 * Displays user profile information with edit capabilities
 * Integrates with Redux for state management
 */
const ProfilePage = () => {
    // ===== REDUX STATE MANAGEMENT =====
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user) || {};

    // Component version for tracking updates
    // Used for potential future versioning of the ProfilePage component
    const componentVersion = 1;
    
    // ===== LOCAL STATE MANAGEMENT =====
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: currentUser.username || '',
        email: currentUser.email || ''
    });
    const [validationErrors, setValidationErrors] = useState({});
    
    // ===== UTILITY HELPER FUNCTIONS =====
    // Helper function to format the user's join date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', DATE_FORMAT_OPTIONS);
    };

    // Helper function to get display username with fallback
    const getDisplayUsername = (username) => {
        return username || DEFAULT_USER_DISPLAY;
    };

    // Helper function to get username handle with fallback
    const getUsernameHandle = (username) => {
        return `@${(username || DEFAULT_USERNAME_FALLBACK).toLowerCase()}`;
    };

    // Helper function to check if form has unsaved changes
    const hasUnsavedChanges = () => {
        return formData.username !== (currentUser.username || '') || 
               formData.email !== (currentUser.email || '');
    };

    // ===== EVENT HANDLERS =====
    // Handles changes to input fields in the edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handles form submission for saving profile changes
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(thunkUpdateUser(currentUser.id, formData));
        if (response === null) {
            setIsEditing(false);
            setValidationErrors({});
        } else {
            setValidationErrors(response.errors || {});
        }
    };

    // Resets the form and exits edit mode without saving changes
    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            username: currentUser.username || '',
            email: currentUser.email || ''
        });
        setValidationErrors({});
    };

    // Placeholder for future feature interactions
    const handleFeatureClick = () => {
        alert("Feature coming soon");
    };

    // ===== COMPONENT RENDER =====
    return (
        <div className="profile-container">
            <main className="main-content">
                {/* Profile Header */}
                <div className="profile-header">
                    {/* User avatar and basic info */}
                    <div className="profile-info">
                        <div className="profile-avatar">
                            <div className="avatar-circle">
                                <svg 
                                    width={AVATAR_SIZE} 
                                    height={AVATAR_SIZE} 
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
                            <h1>{getDisplayUsername(currentUser.username)}</h1>
                            <span className="username">{getUsernameHandle(currentUser.username)}</span>
                        </div>
                    </div>
                    {/* Edit and Cancel buttons */}
                    <div className="button-group">
                        <button 
                            className={`edit-profile-button ${isEditing ? 'editing' : ''}`}
                            onClick={isEditing ? handleSubmit : () => setIsEditing(true)}
                        >
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                        {isEditing && (
                            <button className="cancel-button" onClick={handleCancel}>
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                {/* Account Settings */}
                <div className="settings-section">
                    <h2>Account Settings</h2>
                    <div className="settings-grid">
                        <div className="setting-item">
                            <span className="setting-label">Email</span>
                            {isEditing ? (
                                <div className="setting-input-container">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="setting-input"
                                    />
                                    {validationErrors.email && <span className="error-message">{validationErrors.email}</span>}
                                </div>
                            ) : (
                                <span className="setting-value">{currentUser.email || 'N/A'}</span>
                            )}
                        </div>
                        <div className="setting-item">
                            <span className="setting-label">Username</span>
                            {isEditing ? (
                                <div className="setting-input-container">
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="setting-input"
                                    />
                                    {validationErrors.username && <span className="error-message">{validationErrors.username}</span>}
                                </div>
                            ) : (
                                <span className="setting-value">{currentUser.username || 'N/A'}</span>
                            )}
                        </div>
                        <div className="setting-item">
                            <span className="setting-label">Member Since</span>
                            <span className="setting-value">{formatDate(currentUser.created_at)}</span>
                        </div>
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="settings-section">
                    <h2>Preferences</h2>
                    <div className="settings-grid">
                        <div className="setting-item">
                            <span className="setting-label">Theme</span>
                            <div className="setting-toggle" onClick={handleFeatureClick}>Dark</div>
                        </div>
                        <div className="setting-item">
                            <span className="setting-label">Notifications</span>
                            <div className="setting-toggle" onClick={handleFeatureClick}>On</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default ProfilePage;