import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkUpdateUser } from '../../redux/session';
import './ProfilePage.css';

const ProfilePage = () => {
    // Redux hooks for dispatching actions and accessing state
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user) || {};

    // Temporary version variable for ProfilePage
    const profilePageVersion = 1;
    
    // State hooks for edit mode, form data, and error handling
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        username: user.username || '',
        email: user.email || ''
    });
    const [errors, setErrors] = useState({});
    
    // Helper function to format the user's join date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    // Handles changes to input fields in the edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Submits the updated user data to the server and handles the response
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(thunkUpdateUser(user.id, editData));
        if (response === null) {
            setIsEditing(false);
            setErrors({});
        } else {
            setErrors(response.errors || {});
        }
    };

    // Resets the form and exits edit mode without saving changes
    const handleCancel = () => {
        setIsEditing(false);
        setEditData({
            username: user.username || '',
            email: user.email || ''
        });
        setErrors({});
    };

    // Placeholder for future feature interactions
    const handleFeatureClick = () => {
        alert("Feature coming soon");
    };

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
                            <h1>{user.username || 'User'}</h1>
                            <span className="username">@{(user.username || 'user').toLowerCase()}</span>
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
                                        value={editData.email}
                                        onChange={handleInputChange}
                                        className="setting-input"
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>
                            ) : (
                                <span className="setting-value">{user.email || 'N/A'}</span>
                            )}
                        </div>
                        <div className="setting-item">
                            <span className="setting-label">Username</span>
                            {isEditing ? (
                                <div className="setting-input-container">
                                    <input
                                        type="text"
                                        name="username"
                                        value={editData.username}
                                        onChange={handleInputChange}
                                        className="setting-input"
                                    />
                                    {errors.username && <span className="error-message">{errors.username}</span>}
                                </div>
                            ) : (
                                <span className="setting-value">{user.username || 'N/A'}</span>
                            )}
                        </div>
                        <div className="setting-item">
                            <span className="setting-label">Member Since</span>
                            <span className="setting-value">{formatDate(user.created_at)}</span>
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