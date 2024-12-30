import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEntry } from "../features/entrySlice";
import { useNavigate } from "react-router-dom";
import MoodSelector from "../components/journal-entry-components/MoodSelector";
import FavoriteToggle from "../components/journal-entry-components/FavouriteToggle";
import FormButton from "../components/journal-entry-components/FormButton";
import TextInput from "../components/journal-entry-components/TextInput";
import TipTapEditor from "../components/TipTapEditor.jsx";

function AddNewJournalEntry() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [tipTapBody, setTipTapBody] = useState({ type: "doc", content: [] });
    const [mood, setMood] = useState(["happy"]);
    const [favorite, setFavorite] = useState(false);

    const handleMoodChange = (selectedMoods) => setMood(selectedMoods);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || tipTapBody.content.length === 0) {
            alert("Please enter a title and body for your entry.");
            return;
        }

        const newEntry = { title, tipTapBody, mood, favorite };

        dispatch(addEntry(newEntry))
            .unwrap()
            .then(() => {
                navigate("/dashboard");
            })
            .catch((error) => {
                alert(`Failed to add entry: ${error}`);
            });
    };

    return (
        <div>
            <h1>Add New Journal Entry</h1>
            <form onSubmit={handleSubmit}>
                <TextInput
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for your entry"
                />
                <br />

                <TipTapEditor content={tipTapBody} onSave={setTipTapBody} />
                <br />

                <MoodSelector
                    id="mood"
                    label="Mood"
                    value={mood}
                    onChange={handleMoodChange}
                    options={["happy", "sad", "excited", "anxious", "neutral"]}
                />
                <br />
                <FavoriteToggle
                    isFavorite={favorite}
                    onToggle={() => setFavorite(!favorite)}
                />
                <br />
                <FormButton type="submit">Save Entry</FormButton>
            </form>
        </div>
    );
}

export default AddNewJournalEntry;
