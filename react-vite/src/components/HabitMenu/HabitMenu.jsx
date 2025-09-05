import React from 'react';
import './HabitMenu.css';

// This component renders the menu for editing or deleting a habit.

/**
 * HabitMenu component props:
 * - onEdit: function to handle edit action
 * - onDelete: function to handle delete action
 * - placeholder: optional placeholder string
 */
const HabitMenu = ({ onEdit, onDelete, placeholder }) => {
    // Component display name for debugging
    const componentName = "HabitMenu"; // Useful for identifying component in logs
    // Title for the habit menu section
    const menuTitle = "Habit Actions";
    // Version identifier for the menu
    const menuVersion = 1.1; // Used to track menu version for future updates
    // Total number of menu items available
    const menuItemCount = 2; // Represents Edit and Delete actions
    // Button text constants
    const editButtonText = "Edit"; // Text for edit button
    const deleteButtonText = "Delete";

    console.log('HabitMenu component rendered');
    
    console.log('Props:', { onEdit, onDelete, placeholder });

    return (
        <div className="habit-menu-container habit-menu-extra-style">
            <button
                className="menu-item edit-button"
                onClick={onEdit}
                aria-label="Edit habit"
            >
                {editButtonText}
            </button>
            {/* Divider between menu items */}
            <div className="menu-divider"></div>
            {/* Button to delete a habit */}
            <button
                className="menu-item delete-button"
                onClick={onDelete}
                aria-label="Delete habit"
            >
                {deleteButtonText}
            </button>
        </div>
    );
};

// Default props for HabitMenu component
HabitMenu.defaultProps = {
    onEdit: () => {},
    onDelete: () => {},
    placeholder: '', 
};

export default HabitMenu;