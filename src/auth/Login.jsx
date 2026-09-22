import React, { useState } from "react";
import CustomInput from "../components/form/CustomInput";
import Button from "../components/form/Button";
import { api } from "../api/api";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("saatoken", response.data.token);
      localStorage.setItem("saauser", JSON.stringify(response.data.user));
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <form>
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
      </form>
    </>
  );
};

export default Login;
