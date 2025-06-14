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
    const [entryText, setEntryText] = useState('Start your entry here...'); // Renamed from entryContent
    // State for the image URL input field
    const [imageURL, setImageURL] = useState('https://example.com/default-image.jpg'); // Renamed from imageLink
    // State for tracking form validation errors
    const [errors, setErrors] = useState({}); // Error messages for form validation
    const [isSubmitting, setIsSubmitting] = useState(false); // Tracks if form is being submitted

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Store trimmed entry text for validation
        const trimmedEntry = entryText.trim();

        if (isSubmitting) return; // Prevent multiple submissions

        setIsSubmitting(true); // Disable button

        // TODO: Add more robust validation for entryText (e.g., character limits, profanity filter)

        // Validate entry content
        // Ensure the entry text is not empty before submitting
        if (!trimmedEntry) { // Updated variable name
            setErrors({ entry: "Entry text is required" });
            setIsSubmitting(false); // Re-enable button
            return;
        }

        // Prepare entry data for submission
        const entryData = {
            improvement_note: entryText, // Updated variable name
            image_url: imageURL || null, // Updated variable name
            compound_meter_increment: 1.0 // Increment value for compound meter
        };

        try {
            // Dispatch createEntry action
            const result = await dispatch(createEntry(entryData));

            if (result) {
                // TODO: Consider showing a success message to the user before closing the modal

                // Update user stats after successful entry creation
                const newStats = {
                    ...stats, // Spread existing stats
                    compound_meter: (stats.compound_meter || 0) + 1.0 // Increment compound meter
                };

                await dispatch(updateUserStats(newStats)); // Dispatch updated stats
                closeModal(); // Close modal on success
            } else {
                setErrors({ submit: "Failed to create entry" }); // Handle failure
            }
        } catch (error) {
            // TODO: Log error details for debugging purposes
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
                        value={entryText} // Updated variable name
                        onChange={(e) => setEntryText(e.target.value)} // Updated variable name
                        placeholder="Write about your day or improvements..."
                        required
                    />
                    {errors.entry && <p className="error-message">{errors.entry}</p>}
                </div>

                <div className="input-group">
                    <label>Image URL (optional)</label>
                    <input
                        type="text"
                        value={imageURL} // Updated variable name
                        onChange={(e) => setImageURL(e.target.value)} // Updated variable name
                        placeholder="Enter a valid image URL (e.g., https://example.com/image.jpg)"
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
                        Create Entry {/* Removed redundant conditional rendering */}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEntryModal;