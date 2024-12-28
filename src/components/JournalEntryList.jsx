import React from "react";
import JournalEntryPreview from "./JournalEntryPreview";

const JournalEntries = ({ entries }) => {
    return (
        <div>
            <ul>
                {entries.map((entry) => {
                    return <JournalEntryPreview key={entry.id} entry={entry} />;
                })}
            </ul>
        </div>
    );
};

export default JournalEntries;
