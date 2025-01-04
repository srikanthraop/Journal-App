import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigation } from "react-router-dom";
import { deleteEntry } from "../features/entrySlice";
import { Button } from "./ui/button";
import DeleteButton from "./DeleteButton";

function JournalEntryPreview({ entry }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(
    function () {
      if (navigation.state !== "idle") {
        console.log("PREVIEW" + navigation.state);
      }
    },
    [navigation],
  );

  const mood = Array.isArray(entry.mood)
    ? entry.mood.join(", ")
    : entry.mood || "No mood specified";

  function handleDelete() {
    dispatch(deleteEntry(entry.id));
  }

  return (
    <li className="flex flex-col gap-y-3">
      <h1 className="font-bold">{entry.title}</h1>
      <p>{entry.date}</p>
      <p>
        <strong>Moods:</strong> {mood}
      </p>

      <div className="flex flex-row gap-x-2">
        <Link to={`/entry/${entry.id}`}>
          <Button>View More</Button>
        </Link>

        <DeleteButton
          title="Delete"
          descriptionTitle="Confirm Deletion"
          descriptionBody="Are you sure you want to delete this entry? This action cannot be undone."
          onDelete={handleDelete}
        />

        <Link to={`/entry/${entry.id}/edit`}>
          <Button variant="secondary">Edit</Button>
        </Link>
      </div>
    </li>
  );
}

export default JournalEntryPreview;
