import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEntry } from "../features/entrySlice";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import MoodSelector from "../components/journal-entry-components/MoodSelector";
import FavoriteToggle from "../components/journal-entry-components/FavouriteToggle";
import FormButton from "../components/journal-entry-components/FormButton";
import TipTapEditor from "../components/TipTapEditor.jsx";
import TitleTipTap from "../components/MinimalTipTapEditor.jsx";
import MinimalTipTapEditor from "../components/MinimalTipTapEditor.jsx";

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
    <div className="mx-8 my-20">
      <h1>Add New Journal Entry</h1>

      <MinimalTipTapEditor content={title} onSave={setTitle} />

      <form className="flex flex-col gap-y-8" onSubmit={handleSubmit}>
        {/* <div className="w-72">
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your entry"
          />
        </div> */}
        <div className="flex-grow">
          <TipTapEditor content={tipTapBody} onSave={setTipTapBody} />
        </div>

        <MoodSelector
          className="w-60"
          id="mood"
          label="Mood"
          value={mood}
          onChange={handleMoodChange}
          options={["happy", "sad", "excited", "anxious", "neutral"]}
        />

        <FavoriteToggle
          isFavorite={favorite}
          onToggle={() => setFavorite(!favorite)}
        />

        <FormButton type="submit">Save Entry</FormButton>
      </form>
    </div>
  );
}

export default AddNewJournalEntry;
