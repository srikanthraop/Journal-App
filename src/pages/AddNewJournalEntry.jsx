import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addEntry } from "../features/entrySlice";
import { useNavigate } from "react-router-dom";
import TipTapEditor from "../components/TipTapEditor.jsx";
import MinimalTipTapEditor from "../components/MinimalTipTapEditor.jsx";
import MoodCards from "@/components/mood/MoodCards";
import { Button } from "@/components/ui/button";

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
      <form
        className="flex flex-col justify-center gap-y-8"
        onSubmit={handleSubmit}
      >
        <MinimalTipTapEditor content={title} onSave={setTitle} />
        <div className="flex-grow">
          <TipTapEditor content={tipTapBody} onSave={setTipTapBody} />
        </div>

        <MoodCards
          sliderValues={submoodSliders}
          onChangeSliderValues={setSubmoodSliders}
        />

        <Button
          type="submit"
          varaint="default"
          className="mx-auto flex w-24 flex-row"
        >
          Save Entry
        </Button>
      </form>
    </div>
  );
}

export default AddNewJournalEntry;
