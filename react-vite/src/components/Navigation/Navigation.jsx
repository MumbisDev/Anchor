import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = () => {
    return (
        <div className="nav-wrapper">
            {/* Wrapper for the entire navigation component */}
            
            {/* Header */}
            <header className="main-header">
                {/* Logo and Profile Button */}
                <Link to="/home">
                    <h1>Anchor</h1>
                </Link>
                <ProfileButton />
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
                    >
                        HABITS
                    </NavLink>
                    <NavLink 
                        to="/entries" 
                        className={({ isActive }) => 
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        DAILY ENTRIES
                    </NavLink>
                    <NavLink 
                        to="/stats" 
                        className={({ isActive }) => 
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        STATS
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};

export default Navigation;