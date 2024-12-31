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
    <li className="flex flex-col gap-y-3">
      <h1 className="font-bold">{entry.title}</h1>
      <p>{entry.date}</p>
      <p>
        <strong>Moods:</strong> {mood}
      </p>
      {/* <p>
        <strong>Tags:</strong>
        {entry.tags ? entry.tags.join(", ") : "No tags"}
      </p> */}

      <div className="flex flex-row gap-x-2">
        <Link to={`/entry/${entry.id}`}>
          <Button>View More</Button>
        </Link>

        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>

        <Link to={`/entry/${entry.id}/edit`}>
          <Button variant="secondary">Edit</Button>
        </Link>
      </div>
    </li>
  );
}

export default JournalEntryPreview;
