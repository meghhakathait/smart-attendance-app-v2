import React from "react";
import Navbar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import { Outlet } from "react-router";

const TeacherLayout = () => {
  const routes = [
    { url: "/teacher", icon: "gauge", text: "Dashboard" },
    { url: "/teacher/generate-qr", icon: "users", text: "Generate QR" },
    { url: "/teacher/my-classes", icon: "list", text: "My Classes" },
    {
      url: "/teacher/my-students",
      icon: "clipboard-clock",
      text: "My Students",
    },
  ];
  return (
    <>
      <Navbar routes={routes} />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default TeacherLayout;
