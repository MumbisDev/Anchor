// DailyEntriesPage component displays and manages daily user entries.
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { getUserEntries, deleteEntry } from '../../redux/entries';
import { updateUserStats } from '../../redux/stats';
import DeleteEntryModal from './DeleteEntryModal';
import EditEntryModal from './EditEntryModal';
import './DailyEntriesPage.css';
import CreateEntryModal from './CreateEntryModal';

const DailyEntriesPage = () => {
    // Debug mode flag (not currently used)
    const debugMode = false;
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const entries = useSelector(state => state.entries.entries);
    const stats = useSelector(state => state.stats.stats);
    const isLoading = useSelector(state => state.entries.isLoading);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [entryExistsForToday, setEntryExistsForToday] = useState(false);

    // Track number of entries for display/debug
    const entryCount = entries.length;

    // Example: log entry count on every render (for development)
    // console.log('Entry count:', entryCount);

    // useEffect to fetch user entries on mount
    useEffect(() => {
        // Fetch user entries when the component mounts
        dispatch(getUserEntries());
    }, [dispatch]);

    useEffect(() => {
        const checkEntryExistsForToday = () => {
            // Check if an entry exists for today's date
            const todayDate = new Date().toISOString().split('T')[0];
            const exists = entries.some(entry => {
                const entryDate = new Date(entry.created_at).toISOString().split('T')[0];
                return entryDate === todayDate;
            });

            setEntryExistsForToday(exists);
        };

        checkEntryExistsForToday();
    }, [entries]);

    // --- Entry Deletion Logic ---
    // Handles deletion of an entry and updates stats
    const handleDelete = async (entryId) => {
        try {
            // Attempt to delete the selected entry
            const result = await dispatch(deleteEntry(entryId));
            if (result?.success) {
                // Update user stats after successful deletion
                const newStats = {
                    ...stats,
                    compound_meter: Math.max((stats?.compound_meter || 0) - 1.0, 0),
                };

                await dispatch(updateUserStats(newStats));
                setSelectedEntry(null);
            }
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    const openCreateEntryModal = () => {
        setModalContent(<CreateEntryModal />);
    };

    // Opens the modal to edit the selected entry
    const openEditEntryModal = () => {
        if (selectedEntry) {
            setModalContent(<EditEntryModal entry={selectedEntry} />);
        }
    };

    // Opens the modal to confirm deletion of the selected entry
    const openDeleteEntryModal = () => {
        if (selectedEntry) {
            setModalContent(
                <DeleteEntryModal 
                    entry={selectedEntry} 
                    onDelete={handleDelete}
                />
            );
        }
    };

    // Format date for display
    // Helper function to format entry date strings
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).toUpperCase();
    };

    if (isLoading) return <div>Loading...</div>;

    // Sort entries by date (newest first)
    const sortedEntries = [...entries].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
    );

    return (
        <div className="daily-entries-container">
            <main className="main-content">
                {/* Action Buttons */}
                <div className="entry-actions">
                    <div className="left-actions">
                        <button 
                            className="action-button"
                            onClick={openCreateEntryModal}
                            disabled={entryExistsForToday}
                        >
                            Create Entry
                        </button>
                    </div>
                    <div className="right-actions">
                        <button 
                            className="action-button"
                            onClick={openEditEntryModal}
                            disabled={!selectedEntry}
                        >
                            Edit Entry
                        </button>
                        <button 
                            className="action-button"
                            onClick={openDeleteEntryModal}
                            disabled={!selectedEntry}
                        >
                            Delete Entry
                        </button>
                    </div>
                </div>

                {/* Entries List */}
                <div className="entries-list">
                    {sortedEntries && sortedEntries.length > 0 ? (
                        sortedEntries.map(dailyEntry => (
                            <div 
                                key={dailyEntry.id} 
                                className={`entry-card ${selectedEntry?.id === dailyEntry.id ? 'selected' : ''}`}
                                onClick={() => setSelectedEntry(dailyEntry)}
                            >
                                <div className="entry-content">
                                    <div className="entry-date">
                                        {formatDate(dailyEntry.created_at)}
                                    </div>
                                    <div className="entry-text">
                                        {dailyEntry.improvement_note}
                                    </div>
                                </div>
                                <div className="entry-graph">
                                    {dailyEntry.image_url ? (
                                        <img 
                                            src={dailyEntry.image_url} 
                                            alt="Entry visualization" 
                                            className="entry-image"
                                        />
                                    ) : (
                                        <div className="graph-placeholder"></div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-entries-message">
                            No entries yet. Click &apos;Create Entry&apos; to add one!
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DailyEntriesPage;