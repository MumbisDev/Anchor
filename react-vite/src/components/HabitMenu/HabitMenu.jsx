import React from 'react';
import './HabitMenu.css';

const HabitMenu = ({ onEdit, onDelete }) => {
    return (
        <div className="habit-menu-container">
            <button className="menu-item" onClick={onEdit}>
                Edit
            </button>
            <div className="menu-divider"></div>
            <button className="menu-item" onClick={onDelete}>
                Delete
            </button>
        </div>
    );
};

export default HabitMenu;