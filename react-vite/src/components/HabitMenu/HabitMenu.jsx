import React from 'react';
import './HabitMenu.css';

const HabitMenu = ({ onEdit, onDelete }) => {
    // Log to indicate component rendering
    console.log('HabitMenu component rendered');
    return (
        <div className="habit-menu-container">
            {/* Button to edit a habit */}
            <button
                className="menu-item edit-button"
                onClick={onEdit}
                aria-label="Edit habit"
            >
                Edit
            </button>
            {/* Divider between menu items */}
            <div className="menu-divider"></div>
            {/* Button to delete a habit */}
            <button
                className="menu-item delete-button"
                onClick={onDelete}
                aria-label="Delete habit"
            >
                Delete
            </button>
        </div>
    );
};

// Default props for HabitMenu component
HabitMenu.defaultProps = {
    onEdit: () => {},
    onDelete: () => {},
};

export default HabitMenu;