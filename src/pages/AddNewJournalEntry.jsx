import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addEntry } from "../features/entrySlice";
import { useNavigate } from "react-router-dom";
import FavoriteToggle from "../components/journal-entry-components/FavouriteToggle";
import FormButton from "../components/journal-entry-components/FormButton";
import TipTapEditor from "../components/TipTapEditor.jsx";
import MinimalTipTapEditor from "../components/MinimalTipTapEditor.jsx";
import MoodCards from "@/components/mood/MoodCards";

function AddNewJournalEntry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tipTapBody, setTipTapBody] = useState({ type: "doc", content: [] });
  const [mood, setMood] = useState(["happy"]);
  const [favorite, setFavorite] = useState(false);
  const [submoodSliders, setSubmoodSliders] = useState({});

  useEffect(
    function () {
      console.log(submoodSliders);
    },
    [submoodSliders],
  );

  const handleMoodChange = (selectedMoods) => setMood(selectedMoods);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || tipTapBody.content.length === 0) {
      alert("Please enter a title and body for your entry.");
      return;
    }

    const newEntry = { title, tipTapBody, mood, favorite, submoodSliders };

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
      <form className="flex flex-col gap-y-8" onSubmit={handleSubmit}>
        <MinimalTipTapEditor
          className="z-2"
          content={title}
          onSave={setTitle}
        />
        <div className="flex-grow">
          <TipTapEditor content={tipTapBody} onSave={setTipTapBody} />
        </div>

        <MoodCards
          sliderValues={submoodSliders}
          onChangeSliderValues={setSubmoodSliders}
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
