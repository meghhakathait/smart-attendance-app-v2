import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const local = localStorage.getItem("saauser");
    // Guard against null, empty string, and the literal "undefined" string
    if (!local || local === "undefined") {
      return null;
    }
    try {
      return JSON.parse(local);
    } catch (e) {
      localStorage.removeItem("saauser");
      return null;
    }
  });

  const logout = () => {
    localStorage.removeItem("saatoken");
    localStorage.removeItem("saauser");
    setUser(null);
    navigate("/");
  };

  const authStatus = async () => {
    try {
      const response = await api.get("/auth/me");
      // Fallback to null if user object is missing in response
      const userData = response?.data?.user ?? null;
      setUser(userData);

      if (userData) {
        localStorage.setItem("saauser", JSON.stringify(userData));
      } else {
        localStorage.removeItem("saauser");
      }
    } catch (error) {
      localStorage.removeItem("saatoken");
      localStorage.removeItem("saauser");
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("saatoken");
    if (!token || token === "undefined") {
      return;
    }
    authStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
