// This component renders a confirmation modal for deleting a habit

// TODO: Consider adding a loading state during deletion

import React from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch for potential Redux actions
import { useModal } from '../../context/Modal';
// Import styles for the delete confirmation modal
import './DeleteConfirmationModal.css';

// Props: habit (object), onDelete (function)
const DeleteConfirmationModal = ({ habit, onDelete }) => {
    console.log('DeleteConfirmationModal rendered');
    const { closeModal } = useModal();
    // Destructured closeModal from useModal

    // Handles the delete button click event
    const handleDeleteClick = async () => {
        console.log('Deleting habit with id:', habit.id);
        await onDelete(habit.id);
        closeModal();
    };

    return (
        <div className="delete-confirmation-modal">
            <h2>Delete Habit</h2>
            <p className="confirmation-text">
                Are you sure you want to delete this habit?
                <br />
                This action cannot be undone.
            </p>
            <div className="button-group">
                <button 
                    type="button" 
                    className="cancel-button"
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button 
                    type="button" 
                    className="delete-button"
                    onClick={handleDeleteClick}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

// Set default props for the DeleteConfirmationModal component
DeleteConfirmationModal.defaultProps = {
    onDelete: () => Promise.resolve(),
};

export default DeleteConfirmationModal;