import React from "react";
import Navbar from "../components/layout/Navbar";

import { Outlet } from "react-router";
import Container from "../components/layout/Container";

const AdminLayout = () => {
  const routes = [
    { url: "/admin", icon: "gauge", text: "Dashboard" },
    { url: "/admin/manage-users", icon: "users", text: "Teacher/Student" },
    { url: "/admin/classes", icon: "list", text: "Classes" },
    { url: "/admin/logs", icon: "clipboard-clock", text: "Logs" },
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

export default AdminLayout;
