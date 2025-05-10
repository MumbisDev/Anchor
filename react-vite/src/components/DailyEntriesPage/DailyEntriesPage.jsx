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
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const entries = useSelector(state => state.entries.entries);
    const stats = useSelector(state => state.stats.stats);
    const isLoading = useSelector(state => state.entries.isLoading);
    const [isEntrySelected, setIsEntrySelected] = useState(null);
    const [hasEntryForToday, setHasEntryForToday] = useState(false);

    useEffect(() => {
        // Fetch user entries when the component mounts
        dispatch(getUserEntries());
    }, [dispatch]);

    useEffect(() => {
        const checkHasEntryForToday = () => {
            // Check if an entry exists for today's date
            const todayDate = new Date().toISOString().split('T')[0];
            const exists = entries.some(entry => 
                new Date(entry.created_at).toISOString().split('T')[0] === todayDate
            );

            setHasEntryForToday(exists);
        };

        checkHasEntryForToday();
    }, [entries]);

    const handleDelete = async (entryId) => {
        try {
            // Attempt to delete the selected entry
            const result = await dispatch(deleteEntry(entryId));
            if (result?.success) {
                // Update user stats after successful deletion
                const updatedStats = {
                    ...stats,
                    compound_meter: Math.max((stats?.compound_meter || 0) - 1.0, 0),
                };

                await dispatch(updateUserStats(updatedStats));
                setIsEntrySelected(null);
            }
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    const openCreateEntryModal = () => {
        setModalContent(<CreateEntryModal />);
    };

    const openEditEntryModal = () => {
        if (isEntrySelected) {
            setModalContent(<EditEntryModal entry={isEntrySelected} />);
        }
    };

    const openDeleteEntryModal = () => {
        if (isEntrySelected) {
            setModalContent(
                <DeleteEntryModal 
                    entry={isEntrySelected} 
                    onDelete={handleDelete}
                />
            );
        }
    };

    // Format date for display
    const formatDate = (dateString) => 
        new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).toUpperCase();

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
                            disabled={hasEntryForToday}
                        >
                            Create Entry
                        </button>
                    </div>
                    <div className="right-actions">
                        <button 
                            className="action-button"
                            onClick={openEditEntryModal}
                            disabled={!isEntrySelected}
                        >
                            Edit Entry
                        </button>
                        <button 
                            className="action-button"
                            onClick={openDeleteEntryModal}
                            disabled={!isEntrySelected}
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
                                className={`entry-card ${isEntrySelected?.id === dailyEntry.id ? 'selected' : ''}`}
                                onClick={() => setIsEntrySelected(dailyEntry)}
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