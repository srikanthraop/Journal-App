import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addEntry } from "../features/entrySlice";
import { Form, useNavigate } from "react-router-dom";
import TipTapEditor from "../components/TipTapEditor.jsx";
import MinimalTipTapEditor from "../components/MinimalTipTapEditor.jsx";
import MoodCards from "@/components/mood/MoodCards";
import { Button } from "@/components/ui/button";
import CustomMenu from "@/components/CustomMenu";
import CustomMenuDialog from "@/components/CustomMenuDialog";

function AddNewJournalEntry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tipTapBody, setTipTapBody] = useState({ type: "doc", content: [] });
  const [mood, setMood] = useState(["happy"]);
  const [favorite, setFavorite] = useState(false);
  const [submoodSliders, setSubmoodSliders] = useState({});
  const [attachedMedia, setAttachedMedia] = useState({
    game: null,
    movie: null,
    song: null,
    excerpt: null,
  });

  const [selectedItem, setSelectedItem] = useState("");
  function handleClose() {
    setSelectedItem("");
  }

  useEffect(
    function () {
      console.log(attachedMedia);
    },
    [attachedMedia],
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || tipTapBody.content.length === 0) {
      alert("Please enter a title and body for your entry.");
      return;
    }

    const newEntry = {
      title,
      tipTapBody,
      mood,
      favorite,
      submoodSliders,
      attachedMedia,
    };

    if (newEntry.excerpt === null) {
      newEntry.excerpt = "I forgot to add an excerpt";
    }

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
    <div className="flex flex-col items-center justify-center py-8">
      <Form
        className="flex w-full max-w-4xl flex-col items-center justify-center gap-y-8"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-y-6 px-4">
          <MinimalTipTapEditor content={title} onSave={setTitle} />
          <TipTapEditor content={tipTapBody} onSave={setTipTapBody} />
        </div>

        <MoodCards
          className="flex w-full flex-wrap justify-center gap-x-4 px-4"
          sliderValues={submoodSliders}
          onChangeSliderValues={setSubmoodSliders}
        />

        <div className="mt-4 flex w-full items-center justify-between px-4">
          <CustomMenu onSelect={setSelectedItem} />

          <Button type="submit" variant="default">
            Save Entry
          </Button>
        </div>

        {selectedItem && (
          <CustomMenuDialog
            selectedItem={selectedItem}
            onClose={handleClose}
            attachedMedia={attachedMedia}
            onAttach={setAttachedMedia}
          />
        )}
      </Form>
    </div>
  );
}

export default AddNewJournalEntry;
