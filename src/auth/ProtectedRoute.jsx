import React, { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }
  if (user.role !== role) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
