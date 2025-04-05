import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createEntry } from '../../redux/entries';
import './CreateEntryModal.css';
import { updateUserStats } from '../../redux/stats';  

const CreateEntryModal = () => {
    // Initialize Redux dispatch and selectors
    const dispatch = useDispatch();
    const stats = useSelector(state => state.stats.stats);
    const { closeModal } = useModal();

    // State variables for form inputs and errors
    const [entryText, setEntryText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return; // Prevent multiple submissions
        setIsSubmitting(true); // Disable button

        // Validate entry text
        if (!entryText.trim()) {
            setErrors({ entry: "Entry text is required" });
            setIsSubmitting(false); // Re-enable button
            return;
        }

        // Prepare entry data for submission
        const entryData = {
            improvement_note: entryText,
            image_url: imageUrl || null,
            compound_meter_increment: 1.0
        };

        try {
            // Dispatch createEntry action
            const result = await dispatch(createEntry(entryData));
            if (result) {
                // Update user stats after successful entry creation
                const newStats = {
                    ...stats,
                    compound_meter: (stats.compound_meter || 0) + 1.0
                };
                await dispatch(updateUserStats(newStats));
                closeModal(); // Ensure modal closes after successful submission
            } else {
                setErrors({ submit: "Failed to create entry" });
            }
        } catch (error) {
            setErrors({ submit: "Failed to create entry" });
        } finally {
            setIsSubmitting(false); // Re-enable button
        }
    };

    return (
        <div className="create-entry-modal">
            <h2>Create an entry</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Entry</label>
                    <textarea
                        value={entryText}
                        onChange={(e) => setEntryText(e.target.value)}
                        placeholder="Write about your day..."
                        required
                    />
                    {errors.entry && <p className="error-message">{errors.entry}</p>}
                </div>

                <div className="input-group">
                    <label>Image URL (optional)</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://"
                    />
                </div>

                <div className="button-group">
                    {/* Cancel button to close the modal */}
                    <button 
                        type="button" 
                        className="cancel-button"
                        onClick={closeModal}
                        disabled={isSubmitting} // Disable cancel button if submitting
                    >
                        Cancel
                    </button>
                    {/* Submit button to create the entry */}
                    <button 
                        type="submit" 
                        className="create-button"
                        disabled={isSubmitting} // Disable create button if submitting
                    >
                        {isSubmitting ? "Create Entry" : "Create Entry"} {/* Show loading text */}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEntryModal;