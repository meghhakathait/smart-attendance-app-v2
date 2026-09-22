import React from "react";

const CustomSelect = ({ label, name, id, options, ...props }) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
      <select
        id={id}
        name={name}
        {...props}
        className="w-full p-3 bg-emerald-900 border border-emerald-300 rounded-md outline-none"
      >
        {options.map(({ value, text }, index) => (
          <option key={index} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
