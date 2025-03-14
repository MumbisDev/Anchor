import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ habit, onDelete }) => {
    const { closeModal } = useModal();

    const handleDelete = async () => {
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
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;