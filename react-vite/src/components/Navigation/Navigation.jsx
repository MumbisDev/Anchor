import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = () => {
    return (
        <div className="nav-wrapper">
            {/* Header */}
            <header className="main-header">
                <h1>Anchor</h1>
                <ProfileButton />
            </header>

            {/* Navigation Bar */}
            <nav className="nav-container">
                <div className="nav-content">
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