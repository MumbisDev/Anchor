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
    const [selectedEntry, setSelectedEntry] = useState(null);

    useEffect(() => {
        dispatch(getUserEntries());
    }, [dispatch]);

    const handleDelete = async (entryId) => {
        try {
            const result = await dispatch(deleteEntry(entryId));
            if (result?.success) {
                const newStats = {
                    ...stats,
                    compound_meter: Math.max((stats?.compound_meter || 0) - 1.0, 0)
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

    const openEditEntryModal = () => {
        if (selectedEntry) {
            setModalContent(<EditEntryModal entry={selectedEntry} />);
        }
    };

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
                        sortedEntries.map(entry => (
                            <div 
                                key={entry.id} 
                                className={`entry-card ${selectedEntry?.id === entry.id ? 'selected' : ''}`}
                                onClick={() => setSelectedEntry(entry)}
                            >
                                <div className="entry-content">
                                    <div className="entry-date">
                                        {formatDate(entry.created_at)}
                                    </div>
                                    <div className="entry-text">
                                        {entry.improvement_note}
                                    </div>
                                </div>
                                <div className="entry-graph">
                                    {entry.image_url ? (
                                        <img 
                                            src={entry.image_url} 
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