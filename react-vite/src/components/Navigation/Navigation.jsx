import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

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
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                        data-placeholder="Home Link"
                    >
                        HABITS {/* Link to habits page */}
                    </NavLink>
                    <NavLink
                        to="/entries"
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                        data-placeholder="Entries Link"
                    >
                        DAILY ENTRIES {/* Link to daily entries page */}
                    </NavLink>
                    <NavLink
                        to="/stats"
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                        data-placeholder="Stats Link"
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

export default Navigation;