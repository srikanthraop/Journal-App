import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigation } from "react-router-dom";
import { deleteEntry } from "../features/entrySlice";
import { Button } from "./ui/button";
import DeleteButton from "./DeleteButton";
import { motion } from "framer-motion";
import HappyText from "@/text-framer-motion/HappyText";
import { getColorForMood, getDominantMood } from "@/utils/moodUtils";

function JournalEntryPreview({ entry }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [splitDate, splitTime] = entry.date.split("T");
  const formattedTime = splitTime.replace("Z", "");

  // useEffect(
  //   function () {
  //     if (navigation.state !== "idle") {
  //       console.log("PREVIEW" + navigation.state);
  //     }
  //   },
  //   [navigation],
  // );

  const mood = Array.isArray(entry.mood)
    ? entry.mood.join(", ")
    : entry.mood || "No mood specified";

  function handleDelete() {
    dispatch(deleteEntry(entry.id));
  }

  if (entry.attachedMedia) {
    const { game, movie, song, excerpt } = entry.attachedMedia;
  }

  const dominantMood = getDominantMood(entry.submoodSliders);
  const dominantMoodColor = getColorForMood(dominantMood);

  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.li
      className="flex flex-col rounded-3xl bg-neutral-50 p-5 font-thin" // Neutral background
      whileHover={{
        scale: 1.03, // Subtle scale-up
        boxShadow: `0px 10px 20px ${dominantMoodColor.boxShadow}`,

        backgroundColor: `${dominantMoodColor.backgroundColor}`, // Slightly deeper yellow on hover
      }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)} // Trigger hover state
      onHoverEnd={() => setIsHovered(false)} // Reset hover state
    >
      <div className="grid grid-rows-2">
        {/* Animated Excerpt */}
        <HappyText
          text={entry.attachedMedia?.excerpt || "I forgot to add an excerpt"}
          isHovered={isHovered} // Pass hover state to HappyText
          dominantMoodColor={dominantMoodColor}
        />

        {/* Title, Date, and Buttons */}
        <div>
          <h1 className="font-spectral text-3xl font-bold">{entry.title}</h1>
          <p className="text-xs font-extralight">{splitDate}</p>

          <div className="mt-4 flex flex-row gap-x-2">
            <motion.div
              initial={{ opacity: 0.1 }} // Start hidden
              whileHover={{ opacity: 1 }} // Fade in on hover
              transition={{ duration: 0.2 }}
            >
              <Link to={`/entry/${entry.id}`}>
                <Button>View More</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.1 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <DeleteButton
                title="Delete"
                descriptionTitle="Confirm Deletion"
                descriptionBody="Are you sure you want to delete this entry? This action cannot be undone."
                onDelete={handleDelete}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0.1 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Link to={`/entry/${entry.id}/edit`}>
                <Button variant="secondary">Edit</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default JournalEntryPreview;
