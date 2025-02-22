import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { updateUserEntry } from '../../redux/entries';
import './CreateEntryModal.css'; // We can reuse the same CSS

const EditEntryModal = ({ entry }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [entryText, setEntryText] = useState(entry.improvement_note);
    const [imageUrl, setImageUrl] = useState(entry.image_url || '');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!entryText.trim()) {
            setErrors({ entry: "Entry text is required" });
            return;
        }

        const entryData = {
            improvement_note: entryText,
            image_url: imageUrl || null,
            compound_meter_increment: entry.compound_meter_increment // Maintain existing value
        };

        try {
            await dispatch(updateUserEntry(entry.id, entryData));
            closeModal();
        } catch (error) {
            setErrors({ submit: "Failed to update entry" });
        }
    };

    return (
        <div className="create-entry-modal">
            <h2>Edit an entry</h2>
            
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
                    <button 
                        type="button" 
                        className="cancel-button"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="create-button"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEntryModal;