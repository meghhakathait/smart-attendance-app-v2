import React from "react";
import Navbar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import { Outlet } from "react-router";

const StudentLayout = () => {
  const routes = [
    { url: "/student", icon: "gauge", text: "Dashboard" },
    { url: "/student/mark-attendance", icon: "users", text: "Mark Attendance" },
    { url: "/student/my-attendance", icon: "list", text: "My Attendance" },
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

export default StudentLayout;
