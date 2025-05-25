import React from "react";
import "../styles/StoreOwnerDashboard.css";

const RatingDistributionChart = ({ distribution }) => (
  <div className="distribution-container">
    <h3>Rating Distribution</h3>
    {Object.entries(distribution)
      .sort((a, b) => b[0] - a[0])
      .map(([stars, percent]) => (
        <div key={stars} className="distribution-bar">
          <span>{stars}⭐</span>
          <div className="bar">
            <div
              className="fill"
              style={{ width: `${percent}%`, backgroundColor: "#f39c12" }}
            />
          </div>
          <span>{percent}%</span>
        </div>
      ))}
  </div>
);

export default RatingDistributionChart;
