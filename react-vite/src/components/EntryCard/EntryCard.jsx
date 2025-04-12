import React from 'react';

const EntryCard = ({ entry, placeholder }) => (
    <div className="entry-card">
        {entry ? (
            <div>{entry.content}</div>
        ) : (
            <div>{placeholder || 'No content available'}</div>
        )}
    </div>
);

export default EntryCard;