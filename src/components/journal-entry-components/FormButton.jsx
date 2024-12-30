import React from "react";

const FormButton = ({ type = "button", children, onClick }) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default FormButton;
