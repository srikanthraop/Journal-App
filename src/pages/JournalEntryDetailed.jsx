import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { getEntryById } from "../services/journalEntryAPI";
import { useDispatch } from "react-redux";
import { deleteEntry } from "../features/entrySlice";
import TiptapEditor from "../components/TipTapEditor";

const JournalEntryDetailed = () => {
    const entry = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleDelete() {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            dispatch(deleteEntry(entry.id));
            navigate("/dashboard");
        }
    }

    return (
        <>
            <div>
                <h1>{entry.title}</h1>
                <p>
                    <strong>Date:</strong> {entry.date}
                </p>
                <p>
                    <strong>Moods:</strong> {entry.mood.join(", ")}
                </p>
                {/* <p>
                    <strong>Body:</strong> {entry.body}
                </p> */}
                <div>
                    <TiptapEditor content={entry.tipTapBody} readOnly={true} />
                </div>
            </div>
            <Link>
                <button onClick={handleDelete}>Delete</button>
            </Link>
        </>
    );
};

export async function journalEntryDetailsLoader({ params }) {
    return await getEntryById(params.id);
}

export default JournalEntryDetailed;
