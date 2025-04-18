import React from 'react';
import './HabitMenu.css';

const HabitMenu = ({ onEdit, onDelete }) => {
    return (
        <div className="habit-menu-container">
            <button className="menu-item edit-button" onClick={onEdit} aria-label="Edit habit">
                Edit
            </button>
            {/* Divider between menu items */}
            <div className="menu-divider"></div>
            <button className="menu-item delete-button" onClick={onDelete} aria-label="Delete habit">
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