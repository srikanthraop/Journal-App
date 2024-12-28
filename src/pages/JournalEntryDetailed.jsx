import React from "react";
import { useLoaderData } from "react-router-dom";
import { getEntryById } from "../services/journalEntryAPI";

const JournalEntryDetailed = () => {
    const entry = useLoaderData();

    return (
        <div>
            <h1>{entry.title}</h1>
            <p>
                <strong>Date:</strong> {entry.date}
            </p>
            <p>
                <strong>Moods:</strong> {entry.mood.join(", ")}
            </p>
            <p>
                <strong>Body:</strong> {entry.body}
            </p>
        </div>
    );
};

export async function journalEntryDetailsLoader({ params }) {
    return getEntryById(params.id);
}

export default JournalEntryDetailed;
