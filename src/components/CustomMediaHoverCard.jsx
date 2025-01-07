import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const CustomMediaHoverCard = ({ attachedMedia }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="font-poppins font-semibold underline underline-offset-4">
          What was I into then?
        </button>
      </HoverCardTrigger>
      <HoverCardContent>
        <ul>
          {Object.entries(attachedMedia).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value || "No entry"}
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CustomMediaHoverCard;
