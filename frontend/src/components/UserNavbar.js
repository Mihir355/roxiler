import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserDashboard.css";

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <nav className="user-navbar">
      <div className="left">
        <span className="logo">🌟</span>
        <span className="company">StoreRate</span>
        <span className="section-title">User Dashboard</span>
      </div>
      <div className="right">
        <span className="nav-item">Settings</span>
        <span className="nav-item" onClick={handleLogout}>
          Logout
        </span>
      </div>
    </nav>
  );
};

export default UserNavbar;
