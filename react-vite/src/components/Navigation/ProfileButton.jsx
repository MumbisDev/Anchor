import React, { useState, useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkLogout } from '../../redux/session';

// Renders the profile dropdown button in the navigation bar
function ProfileButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector(state => state.session.user) || { username: 'User' };
    const dropdownRef = useRef(null); // Ref to detect clicks outside the dropdown menu

    const navigateToProfile = () => {
        setShowMenu(false);
        navigate('/profile');
    };

    // Handles user logout and redirects to home
    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        navigate('/');
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

    return (
        <div className="profile-button-container">
            <button className={`profile-button ${showMenu ? 'active' : ''}`} onClick={(e) => setShowMenu(!showMenu)}>
                <User size={20} color="#e0e0e0" />
            </button>
            {showMenu && (
                <div className="profile-dropdown" ref={dropdownRef}>
                    <div className="user-info">
                        <div className="user-avatar">
                            <svg 
                                width="50" 
                                height="50" 
                                viewBox="0 0 50 50" 
                                fill="none" 
                                stroke="currentColor"
                                className="user-icon-large"
                            >
                                <path 
                                    d="M25 25c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm0 4c-5.34 0-16 2.68-16 8v4h32v-4c0-5.32-10.66-8-16-8z" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="user-details">
                            <div className="user-name">{user?.username || 'User'}</div>
                            <div className="user-handle">@{(user?.username || 'user').toLowerCase()}</div>
                        </div>
                    </div>
                    <div className="menu-divider"></div>
                    <button className="menu-item" onClick={navigateToProfile}>
                        Profile
                    </button>
                    <div className="menu-divider"></div>
                    <button className="menu-item" onClick={logout}>
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileButton;