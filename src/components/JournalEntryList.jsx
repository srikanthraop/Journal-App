import React from "react";
import JournalEntryPreview from "./JournalEntryPreview";

const JournalEntries = ({ entries }) => {
  return (
    <div className="mx-6 mt-5">
      <ul className="flex flex-col gap-y-6">
        {entries.map((entry) => {
          return <JournalEntryPreview key={entry.id} entry={entry} />;
        })}
      </ul>
    </div>
  );
};

export default JournalEntries;
