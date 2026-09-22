import { CheckCircle } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import React from "react";
import { NavLink } from "react-router";

const CustomNavLink = ({ children, to, icon }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 p-4 font-semibold border-b-2 ${isActive ? "border-bs-emerald-200 text-red-300" : "border-b-transparent text-white"}`
      }
    >
      <DynamicIcon name={icon} />
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
