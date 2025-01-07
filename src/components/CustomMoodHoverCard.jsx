import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const CustomMoodHoverCard = ({ submoods }) => {
  // Process the submoods object
  const sortedSubmoods = Object.entries(submoods)
    .filter(([mood, value]) => value > 0) // Ignore entries with zero value
    .sort(([, valueA], [, valueB]) => valueB - valueA); // Sort by descending order of values

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="font-poppins font-semibold underline">
          What were you feeling then?
        </button>
      </HoverCardTrigger>
      <HoverCardContent>
        <ul>
          {sortedSubmoods.map(([mood, value]) => (
            <li key={mood}>
              <strong>{mood}:</strong> {value}
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CustomMoodHoverCard;
