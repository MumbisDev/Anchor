import React from 'react';
import './HabitMenu.css';

const HabitMenu = ({ onEdit, onDelete }) => {
    return (
        <div className="habit-menu-container">
            <button className="menu-item edit-button" onClick={onEdit}>
                Edit
            </button>
            {/* Divider between menu items */}
            <div className="menu-divider"></div>
            <button className="menu-item delete-button" onClick={onDelete}>
                Delete
            </button>
        </div>
    );
};

HabitMenu.defaultProps = {
    onEdit: () => {},
    onDelete: () => {},
};

export default HabitMenu;