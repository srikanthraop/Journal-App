import React, { useEffect } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { getEntryById } from "../services/journalEntryAPI";
import { useDispatch } from "react-redux";
import { addEntries, deleteEntry } from "../features/entrySlice";
import TiptapEditor from "../components/TipTapEditor";
import DeleteButton from "@/components/DeleteButton";
import store from "@/store";

const JournalEntryDetailed = () => {
  const entry = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDelete() {
    await dispatch(deleteEntry(entry.id));
    navigate("/dashboard");
  }

  return (
    <>
      <div>
        <h1>{entry.title}</h1>
        <p>
          <strong>Date:</strong> {entry.date}
        </p>
        <p>
          <strong>Moods:</strong> {entry.mood.join(", ")}
        </p>
        {/* <p>
                    <strong>Body:</strong> {entry.body}
                </p> */}
        <div>
          <TiptapEditor content={entry.tipTapBody} readOnly={true} />
        </div>
      </div>

      {/* <Button onClick={handleDelete}>Delete</Button> */}
      <DeleteButton
        title="Delete"
        descriptionTitle="Confirm Deletion"
        descriptionBody="Are you sure you want to delete this entry? This action cannot be undone."
        onDelete={handleDelete}
      />
    </>
  );
};

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

export default JournalEntryDetailed;
