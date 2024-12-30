import React from "react";

const FavoriteToggle = ({ isFavorite, onToggle }) => {
    return (
        <div>
            <label htmlFor="favorite">Mark as Favorite:</label>
            <button type="button" onClick={onToggle}>
                {isFavorite ? "Unmark Favorite" : "Mark Favorite"}
            </button>
        </div>
    );
};

export default FavoriteToggle;
