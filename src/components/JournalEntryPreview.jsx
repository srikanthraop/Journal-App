import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEntry, resetStatuses } from "../features/entrySlice";

function JournalEntryPreview({ entry }) {
    const dispatch = useDispatch();

    const mood = Array.isArray(entry.mood)
        ? entry.mood.join(", ")
        : entry.mood || "No mood specified";

    function handleDelete() {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            dispatch(deleteEntry(entry.id));
        }
    }

    return (
        <li>
            <h3>{entry.title}</h3>
            <p>
                <strong>Date:</strong> {entry.date}
            </p>
            <p>
                <strong>Moods:</strong> {mood}
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
            <Link>
                <button onClick={handleDelete}>Delete</button>
            </Link>
        </li>
    );
}

export default JournalEntryPreview;
