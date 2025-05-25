import React from "react";
import "../styles/StoreOwnerDashboard.css";

const StoreStatsCards = ({ average, totalReviews }) => (
  <div className="stats-cards">
    <div className="stat-card">
      <h4>Average Rating</h4>
      <p>{average} ⭐</p>
    </div>
    <div className="stat-card">
      <h4>Total Reviews</h4>
      <p>{totalReviews}</p>
    </div>
  </div>
);

export default StoreStatsCards;
