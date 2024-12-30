import React from "react";

const TextArea = ({ id, label, value, onChange }) => {
    return (
        <div>
            <label htmlFor={id}>{label}:</label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder="Write your journal entry here..."
                rows="10"
                cols="50"
            />
        </div>
    );
};

export default TextArea;
