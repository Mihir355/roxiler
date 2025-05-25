import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StoreOwnerDashboard.css";

const StoreOwnerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <nav className="store-owner-navbar">
      <div className="left">
        <span className="logo">🌟</span>
        <span className="company">StoreRate</span>
        <span className="store-title">Store Dashboard</span>
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

export default StoreOwnerNavbar;
