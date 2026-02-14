import React from "react";
import Sidebar from "../AdminSidebar/Sidebar";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">{children}</main>
    </div>
  );
};

export default AdminLayout;
