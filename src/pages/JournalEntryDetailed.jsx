import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getEntryById } from "../services/journalEntryAPI";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { addEntries, deleteEntry } from "../features/entrySlice";
import TiptapEditor from "../components/TipTapEditor";
import DeleteButton from "@/components/DeleteButton";
import store from "@/store";
import CustomMediaHoverCard from "@/components/CustomMediaHoverCard";
import CustomMoodHoverCard from "@/components/CustomMoodHoverCard";

const JournalEntryDetailed = () => {
  const entry = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDelete() {
    await dispatch(deleteEntry(entry.id));
    navigate("/dashboard");
  }
  return (
    <div className="mx-auto my-10 max-w-screen-lg sm:px-10 md:px-16 lg:px-20 xl:px-24">
      <div className="relative grid grid-cols-1 gap-y-8">
        <div>
          <motion.h1
            className="font-spectral text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            initial={{ transform: "translateX(-100px)" }}
            animate={{ transform: "translateX(0px)" }}
            transition={{ type: "spring" }}
          >
            {entry.title}
          </motion.h1>
        </div>

        <motion.div
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              default: { type: "spring" },
              opacity: { ease: "linear" },
            },
          }}
        >
          <TiptapEditor content={entry.tipTapBody} readOnly={true} />
        </motion.div>

        <div className="flex flex-wrap items-center justify-between gap-y-4">
          <div className="flex space-x-4">
            <CustomMediaHoverCard attachedMedia={entry.attachedMedia} />
            <CustomMoodHoverCard submoods={entry.submoodSliders} />
          </div>

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
