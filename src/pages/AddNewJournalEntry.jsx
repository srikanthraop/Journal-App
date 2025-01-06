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
    <div className="mx-8 my-0">
      <Form
        className="flex flex-col justify-center gap-y-8"
        onSubmit={handleSubmit}
      >
        <MinimalTipTapEditor content={title} onSave={setTitle} />
        <div className="flex-grow">
          <TipTapEditor content={tipTapBody} onSave={setTipTapBody} />
        </div>

        <MoodCards
          className="mt-10 flex w-full flex-row justify-center gap-x-3"
          sliderValues={submoodSliders}
          onChangeSliderValues={setSubmoodSliders}
        />

        <CustomMenu onSelect={setSelectedItem} />

        {selectedItem && (
          <CustomMenuDialog
            selectedItem={selectedItem}
            onClose={handleClose}
            attachedMedia={attachedMedia}
            onAttach={setAttachedMedia}
          />
        )}

        <Button type="submit" variant="default">
          Save Entry
        </Button>
      </Form>
    </div>
  );
}

export default AddNewJournalEntry;
