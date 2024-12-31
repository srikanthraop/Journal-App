import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEntry } from "../features/entrySlice";
import { Button } from "./ui/button";

function JournalEntryPreview({ entry }) {
  const dispatch = useDispatch();

  const mood = Array.isArray(entry.mood)
    ? entry.mood.join(", ")
    : entry.mood || "No mood specified";

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      dispatch(deleteEntry(entry.id));
    }
  }

  return (
    <li>
      <h1 className="">{entry.title}</h1>
      <p>
        <strong>Date:</strong> {entry.date}
      </p>
      <p>
        <strong>Moods:</strong> {mood}
      </p>
      <p>
        <strong>Tags:</strong>
        {entry.tags ? entry.tags.join(", ") : "No tags"}
      </p>

      <div className="">
        <Link to={`/entry/${entry.id}`}>
          <Button>View More</Button>
        </Link>

        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>

        <Link to={`/entry/${entry.id}/edit`}>
          <Button>Edit</Button>
        </Link>
      </div>
    </li>
  );
}

export default JournalEntryPreview;
