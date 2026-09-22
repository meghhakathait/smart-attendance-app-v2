import { DynamicIcon } from "lucide-react/dynamic";
import React from "react";

const Button = ({ children, type, icon, secondary, bordered, ...props }) => {
  return (
    <button
      type={type}
      className={`px-6 py-2 rounded-md flex gap-2 items-center cursor-pointer ${secondary ? "bg-emerald-200 text-emerald-950" : bordered ? "bg-transparent border-2 border-emerald-950" : "bg-emerald-950 text-white"}`}
      {...props}
    >
      {icon && <DynamicIcon className="size-4" name={icon} />}
      {children}
    </button>
  );
};

export default Button;
