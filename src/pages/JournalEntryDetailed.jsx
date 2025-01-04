import React, { useEffect } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { getEntryById } from "../services/journalEntryAPI";
import { useDispatch } from "react-redux";
import { deleteEntry } from "../features/entrySlice";
import TiptapEditor from "../components/TipTapEditor";
import DeleteButton from "@/components/DeleteButton";

const JournalEntryDetailed = () => {
  const entry = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigation = useNavigation();
  useEffect(() => {
    console.log(navigation.state);
  }, [navigation]);
  console.log(navigation);

  function handleDelete() {
    dispatch(deleteEntry(entry.id));
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
  return await getEntryById(params.id);
}

export default JournalEntryDetailed;
