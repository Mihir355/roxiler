import React from "react";
import "../styles/admin.css";

const AdminTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["Users", "Stores", "Add User", "Add Store"];
  return (
    <div className="admin-tabs">
      <div
        className="tab-slider-bg"
        style={{ transform: `translateX(${tabs.indexOf(activeTab) * 100}%)` }}
      />
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`tab-option ${activeTab === tab ? "active" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default AdminTabs;
