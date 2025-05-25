import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import OverviewCards from "../components/OverviewCards";
import AdminTabs from "../components/AdminTabs";
import UserTable from "../components/UserTable";
import StoreTable from "../components/StoreTable";
import AddUserForm from "../components/AddUserForm";
import AddStoreForm from "../components/AddStoreForm";
import "../styles/admin.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Users");
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });

  useEffect(() => {
    fetch("https://roxiler-be34.onrender.com/api/admin/overview") // Change URL if needed
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching overview stats:", err));
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "Users":
        return <UserTable />;
      case "Stores":
        return <StoreTable />;
      case "Add User":
        return <AddUserForm />;
      case "Add Store":
        return <AddStoreForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <AdminNavbar />
      <OverviewCards stats={stats} />

      <div className="tab-filter-area">
        <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <button className="filter-button">Filter</button>
      </div>

      {renderContent()}
    </div>
  );
};

export default AdminDashboard;
