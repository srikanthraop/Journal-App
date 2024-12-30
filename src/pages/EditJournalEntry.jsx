import React, { useState } from "react";
import { getEntryById } from "../services/journalEntryAPI";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextInput from "../components/journal-entry-components/TextInput";
import TipTapEditor from "../components/TipTapEditor";
import FormButton from "../components/journal-entry-components/FormButton";
import { editEntry } from "../features/entrySlice";

function EditJournalEntry() {
    const entry = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState(entry.title);
    const [tipTapBody, setTipTapBody] = useState(entry.tipTapBody);

    function handleSubmit(e) {
        e.preventDefault();

        // Validate the input fields
        if (
            !title.trim() ||
            !tipTapBody.content ||
            tipTapBody.content.length === 0
        ) {
            alert("Title and body cannot be empty.");
            return;
        }

        // Construct the updated entry object
        const updatedEntry = {
            ...entry,
            title,
            tipTapBody,
        };

        // Dispatch the editEntry thunk
        dispatch(editEntry(updatedEntry))
            .unwrap()
            .then(() => {
                navigate("/dashboard"); // Redirect to the dashboard on success
            })
            .catch((error) => {
                alert(`Failed to save entry: ${error}`); // Handle errors
            });
    }

    return (
        <div>
            <h1>Edit Journal Entry</h1>
            <form onSubmit={handleSubmit}>
                <TextInput
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />

                <TipTapEditor content={tipTapBody} onSave={setTipTapBody} />

                <br />
                <FormButton type="submit">Save Entry</FormButton>
            </form>
        </div>
    );
}

export async function journalEntryDetailsLoader({ params }) {
    return await getEntryById(params.id);
}

export default EditJournalEntry;
