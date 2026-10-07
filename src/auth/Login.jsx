import React, { useContext, useState } from "react";
import CustomInput from "../components/form/CustomInput";
import Button from "../components/form/Button";
import { api } from "../api/api";
import { useLocation, useNavigate } from "react-router";
import AuthContext from "./AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.loggedOut
    ? "/"
    : location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState(null);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const user = await loginUser(formData);
      if (from !== "/") {
        navigate(from, { replace: true });
      } else {
        navigate(`/${user.role}`); // /admin, /teacher, /student
      }
    } catch (error) {}
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <div>
        <CustomInput
          name="email"
          label="Email"
          type="email"
          htmlFor="email"
          id="email"
          onChange={handleInput}
        />
        <CustomInput
          name="password"
          label="Password"
          type="password"
          htmlFor="password"
          id="password"
          onChange={handleInput}
        />
        <Button icon="key-round" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </>
  );
};

export default Login;
