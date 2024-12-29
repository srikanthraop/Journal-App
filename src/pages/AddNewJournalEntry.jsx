import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEntry } from "../features/entrySlice";
import { useNavigate } from "react-router-dom";

function AddNewJournalEntry() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [mood, setMood] = useState(["happy"]);
    const [favorite, setFavorite] = useState(false);

    const handleMoodChange = (e) => setMood([e.target.value]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !body) {
            alert("Please enter body and details");
            return;
        }

        const newEntry = { title, body, mood, favorite };

        dispatch(addEntry(newEntry))
            .unwrap()
            .then(() => {
                navigate("/dashboard"); // Navigate after success
            })
            .catch((error) => {
                alert(`Failed to add entry: ${error}`);
            });
    };

    return (
        <div>
            <h1>Add New Journal Entry</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter a title for your entry"
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Write your journal entry here..."
                        rows="10"
                        cols="50"
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="mood">Mood:</label>
                    <select
                        id="mood"
                        value={mood}
                        onChange={handleMoodChange}
                        multiple
                    >
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="excited">Excited</option>
                        <option value="anxious">Anxious</option>
                        <option value="neutral">Neutral</option>
                    </select>
                </div>
                <br />
                <div>
                    <label htmlFor="favorite">Mark as Favorite:</label>
                    <button
                        type="button"
                        onClick={() => setFavorite(!favorite)}
                    >
                        {favorite ? "Unmark Favorite" : "Mark Favorite"}
                    </button>
                </div>
                <br />
                <button type="submit">Save Entry</button>
            </form>
        </div>
    );
}

export default AddNewJournalEntry;
