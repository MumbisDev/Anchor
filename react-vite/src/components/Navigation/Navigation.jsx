import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav className="nav-container">
            <div className="nav-content">
                <NavLink 
                    to="/home" 
                    className={({ isActive }) => 
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    HABITS
                </NavLink>
                <NavLink 
                    to="/entries" 
                    className={({ isActive }) => 
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    DAILY ENTRIES
                </NavLink>
                <NavLink 
                    to="/stats" 
                    className={({ isActive }) => 
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    STATS
                </NavLink>
            </div>
        </nav>
    );
};

export default Navigation;