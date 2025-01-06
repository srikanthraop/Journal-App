import React, { useState } from "react";
import { getEntryById } from "../services/journalEntryAPI";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextInput from "../components/journal-entry-components/TextInput";
import TipTapEditor from "../components/TipTapEditor";
import FormButton from "../components/journal-entry-components/FormButton";
import { addEntries, editEntry } from "../features/entrySlice";

function EditJournalEntry() {
  const entry = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(entry.title);
  const [tipTapBody, setTipTapBody] = useState(entry.tipTapBody);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !title.trim() ||
      !tipTapBody.content ||
      tipTapBody.content.length === 0
    ) {
      alert("Title and body cannot be empty.");
      return;
    }

    const updatedEntry = {
      ...entry,
      title,
      tipTapBody,
    };

    dispatch(editEntry(updatedEntry))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        alert(`Failed to save entry: ${error}`);
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
  const state = store.getState();
  const entryId = params.id;

  const entry = state.entries.entries.find((entry) => entry.id === entryId);

  if (entry) {
    return entry;
  }

  try {
    const fetchedEntry = await getEntryById(entryId);
    store.dispatch(addEntries([fetchedEntry]));
    return fetchedEntry;
  } catch (error) {
    throw new Response("Entry not found", { status: 404 });
  }
}

export default EditJournalEntry;
