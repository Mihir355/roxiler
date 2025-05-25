import React from "react";
import "../styles/admin.css";

const OverviewCards = ({ stats }) => (
  <div className="cards-container">
    <div className="card">Total Users: {stats.users}</div>
    <div className="card">Total Stores: {stats.stores}</div>
    <div className="card">Total Ratings: {stats.ratings}</div>
  </div>
);

export default OverviewCards;
