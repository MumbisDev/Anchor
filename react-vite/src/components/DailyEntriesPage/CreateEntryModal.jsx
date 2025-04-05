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
    const [entryContent, setEntryContent] = useState(''); // Renamed from entryText to entryContent
    const [imageLink, setImageLink] = useState(''); // Renamed from imageUrl to imageLink
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return; // Prevent multiple submissions
        setIsSubmitting(true); // Disable button

        // Validate entry content
        if (!entryContent.trim()) { // Updated variable name
            setErrors({ entry: "Entry text is required" });
            setIsSubmitting(false); // Re-enable button
            return;
        }

        // Prepare entry data for submission
        const entryData = {
            improvement_note: entryContent, // Updated variable name
            image_url: imageLink || null, // Updated variable name
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
                        value={entryContent} // Updated variable name
                        onChange={(e) => setEntryContent(e.target.value)} // Updated variable name
                        placeholder="Write about your day or improvements..."
                        required
                    />
                    {errors.entry && <p className="error-message">{errors.entry}</p>}
                </div>

                <div className="input-group">
                    <label>Image URL (optional)</label>
                    <input
                        type="text"
                        value={imageLink} // Updated variable name
                        onChange={(e) => setImageLink(e.target.value)} // Updated variable name
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
                        {isSubmitting ? "Create Entry" : "Create Entry"} {/* Show loading text */}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEntryModal;