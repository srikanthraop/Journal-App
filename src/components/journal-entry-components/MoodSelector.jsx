// import React from "react";

// const MoodSelector = ({ id, label, value, onChange, options }) => {
//     return (
//         <div>
//             <label htmlFor={id}>{label}:</label>
//             <select id={id} value={value} onChange={onChange}>
//                 {options.map((option) => (
//                     <option key={option} value={option}>
//                         {option.charAt(0).toUpperCase() + option.slice(1)}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// };

// export default MoodSelector;
import React from "react";

const MoodSelector = ({ id, label, value, onChange, options }) => {
    const handleChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(
            (option) => option.value
        );
        onChange(selectedOptions); // Pass the array of selected values to the parent component
    };

    return (
        <div>
            <label htmlFor={id}>{label}:</label>
            <select
                id={id}
                value={value}
                onChange={handleChange}
                multiple // Enable multiple selection
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MoodSelector;
