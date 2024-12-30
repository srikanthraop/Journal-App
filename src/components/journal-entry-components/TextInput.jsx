import React from "react";

const TextInput = ({ id, label, value, onChange, placeholder }) => {
    return (
        <div>
            <label htmlFor={id}>{label}:</label>
            <input
                type="text"
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextInput;
