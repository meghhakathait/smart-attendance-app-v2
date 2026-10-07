import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const isLoggingOut = useRef(false); //value memory mai rahe that's why we use

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

  const loginUser = async (formData) => {
    try {
      const response = await api.post("/auth/login", formData);
      isLoggingOut.current = false;
      localStorage.setItem("saatoken", response.data.token);
      localStorage.setItem("saauser", JSON.stringify(response.data.user));
      setUser(response.data.user);
      return response.data.user; //Return the user data for further use if needed
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    isLoggingOut.current = true; //set before clearing the user
    localStorage.removeItem("saatoken");
    localStorage.removeItem("saauser");
    setUser(null);
    navigate("/", { state: { loggedOut: true } }, { replace: true }); 
    //loogedOut property saves in the history of useLocation
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
        loginUser,
        logout,
        isLoggingOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
