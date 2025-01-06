import React from "react";
import JournalEntryPreview from "./JournalEntryPreview";

const JournalEntries = ({ entries }) => {
  return (
    <div>
      <ul className="grid grid-cols-3 justify-center gap-x-5 gap-y-10 p-10">
        {entries.map((entry) => {
          return <JournalEntryPreview key={entry.id} entry={entry} />;
        })}
      </ul>
    </div>
  );
};

export default JournalEntries;
