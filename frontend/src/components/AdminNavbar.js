import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <nav className="admin-navbar">
      <div className="left">
        <span className="logo">🌟</span>
        <span className="company">StoreRate</span>
        <span className="section-title">Admin Dashboard</span>
      </div>
      <div className="right">
        <span className="role">Administrator</span>
        <span className="nav-item" onClick={handleLogout}>
          Logout
        </span>
      </div>
    </nav>
  );
};

export default AdminNavbar;
