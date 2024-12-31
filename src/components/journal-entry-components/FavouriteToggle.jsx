// src/components/FavoriteToggle.js

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

function FavoriteToggle() {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className="text-2xl text-red-500 focus:outline-none"
      aria-label={isFavorite ? "Unfavorite" : "Favorite"}
    >
      <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
    </button>
  );
}

export default FavoriteToggle;
