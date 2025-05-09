import React from 'react';
// Importing necessary components from react-router-dom
import { NavLink, Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';
// Importing CSS for styling the navigation component
import './Navigation.css';

// Set default props for ProfileButton to ensure fallback behavior
ProfileButton.defaultProps = {
    user: null, // Default user is null
    onClick: () => {}, // Default onClick is a no-op
};

const Navigation = () => {
    return (
        <div className="navigation-wrapper">
            {/* Wrapper for the entire navigation component */}
            
            {/* Header */}
            <header className="main-header">
                {/* Logo and Profile Button */}
                <Link to="/home">
                    <h1>Anchor</h1> {/* Main logo text */}
                </Link>
                <ProfileButton /> {/* Profile button for user actions */}
            </header>

            {/* Navigation Bar */}
            <nav className="nav-container">
                <div className="nav-content">
                    {/* Navigation links */}
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : 'inactive'}`
                        }
                        data-placeholder="Home Link"
                        aria-label="Navigate to Habits"
                    >
                        HABITS {/* Link to habits page */}
                    </NavLink>
                    <NavLink
                        to="/entries"
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : 'inactive'}`
                        }
                        data-placeholder="Entries Link"
                        aria-label="Navigate to Daily Entries"
                    >
                        DAILY ENTRIES {/* Link to daily entries page */}
                    </NavLink>
                    <NavLink
                        to="/stats"
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : 'inactive'}`
                        }
                        data-placeholder="Stats Link"
                        aria-label="Navigate to Stats"
                    >
                        STATS {/* Link to stats page */}
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};

// TODO: Consider making the navigation links dynamic based on user roles.
// TODO: Add accessibility features like ARIA roles for better usability.
// TODO: Implement a dark mode toggle for the navigation bar.

export default Navigation;