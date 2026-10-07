import React, { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate, replace, useLocation } from "react-router";

const ProtectedRoute = ({ children, role }) => {
  const { user, isLoggingOut } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/"
        state={isLoggingOut.current ? { loggedOut: true } : { from: location }}
        replace
      />
    );
  }
  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
