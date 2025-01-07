import React, { useState } from "react";
import { getEntryById } from "../services/journalEntryAPI";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TipTapEditor from "../components/TipTapEditor";
import FormButton from "../components/journal-entry-components/FormButton";
import { addEntries, editEntry } from "../features/entrySlice";
import MinimalTipTapEditor from "@/components/MinimalTipTapEditor";
import { Button } from "@/components/ui/button";

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
    <div className="mx-auto my-10 max-w-screen-lg sm:px-10 md:px-16 lg:px-20 xl:px-24">
      <Form
        onSubmit={handleSubmit}
        className="relative grid grid-cols-1 gap-y-8"
      >
        <div>
          <MinimalTipTapEditor content={title} onSave={setTitle} />
        </div>

        <div>
          <TipTapEditor content={tipTapBody} onSave={setTipTapBody} />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Entry</Button>
        </div>
      </Form>
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
