import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getEntryById } from "../services/journalEntryAPI";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
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
    <div className="mx-auto my-10 max-w-screen-2xl px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48">
      <div className="relative grid grid-cols-1">
        <div>
          <motion.h1
            className="ml-[135px] font-spectral text-6xl"
            initial={{ transform: "translateX(-100px)" }}
            animate={{ transform: "translateX(0px)" }}
            transition={{ type: "spring" }}
          >
            {entry.title}
          </motion.h1>
          {/* <p>
          <strong>Date:</strong> {entry.date}
        </p> */}

          <div>
            <TiptapEditor content={entry.tipTapBody} readOnly={true} />
          </div>
        </div>

        <div className="sticky w-24">
          <DeleteButton
            title="Delete"
            descriptionTitle="Confirm Deletion"
            descriptionBody="Are you sure you want to delete this entry? This action cannot be undone."
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
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
