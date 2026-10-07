import React from "react";
import Navbar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import { Outlet } from "react-router";

const TeacherLayout = () => {
  const routes = [
    { url: "/teacher", icon: "gauge", text: "Dashboard" },
    { url: "/teacher/my-classes", icon: "list", text: "My Classes" },
    { url: "/teacher/leave-requests", icon: "users", text: "Leave Requests" },
    {
      url: "/teacher/my-students",
      icon: "clipboard-clock",
      text: "My Students",
    },
    { url: "/teacher/defaulters", icon: "users", text: "Defaulters" },
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
