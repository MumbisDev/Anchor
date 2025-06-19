import React from 'react';
import './HabitMenu.css';

const HabitMenu = ({ onEdit, onDelete, placeholder }) => {
    console.log('HabitMenu component rendered');
    
    console.log('Props:', { onEdit, onDelete, placeholder });

    return (
        <div className="habit-menu-container habit-menu-extra-style">
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

HabitMenu.defaultProps = {
    onEdit: () => {},
    onDelete: () => {},
    placeholder: '', 
};

export default HabitMenu;