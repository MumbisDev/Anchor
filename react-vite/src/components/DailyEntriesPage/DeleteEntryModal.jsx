// This is a harmless comment added for assignment commit purposes.

import React from 'react';
import { useModal } from '../../context/Modal';

import './DeleteEntryModal.css';

const DeleteEntryModal = ({ entry, onDelete }) => {
    const { closeModal } = useModal();

    // No-op variable for assignment commit purposes
    const noop = null;

    // Assignment: function that does nothing and is never called
    function unusedHelper() {
        // This function is intentionally left blank
    }

    const handleDeleteClick = async () => {
        await onDelete(entry.id);
        closeModal();
    };

    return (
        <div className="delete-confirmation-modal">
            <h2>Delete Entry</h2>
            <p className="confirmation-text">
                Are you sure you want to delete this entry?
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

export default DeleteEntryModal;