import React from "react";
import { Link } from "react-router-dom";

function JournalEntryPreview({ entry }) {
    return (
        <li>
            <h3>{entry.title}</h3>
            <p>
                <strong>Date:</strong> {entry.date}
            </p>
            <p>
                <strong>Moods:</strong> {entry.mood.join(", ")}
            </p>
            <p>
                <strong>Snippet:</strong> {entry.body.substring(0, 100)}...
            </p>
            <p>
                <strong>Tags:</strong>{" "}
                {entry.tags ? entry.tags.join(", ") : "No tags"}
            </p>
            <Link to={`/entry/${entry.id}`}>
                <button>View More</button>
            </Link>
        </li>
    );
}

export default JournalEntryPreview;
