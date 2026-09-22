import React from "react";

const CustomInput = ({ label, type, name, id, ...props }) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        name={name}
        id={id}
        className="w-full p-3 border border-emerald-300 rounded-md outline-none"
        {...props}
      />
    </div>
  );
};

export default CustomInput;
