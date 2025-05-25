import React from "react";
import "../styles/UserDashboard.css";
const StoreCard = ({ store, onRate }) => {
  const handleStarClick = (rating) => {
    onRate(store.id, rating);
  };

  return (
    <div className="store-card">
      <div className="store-info">
        <h4>{store.name}</h4>
        <p>{store.address}</p>
        <p>Overall Rating: {store.overallRating}⭐</p>
        <p>Your Rating: {store.yourRating || "Not rated"}</p>
      </div>
      <div className="rate-section">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${store.yourRating >= star ? "filled" : ""}`}
            onClick={() => handleStarClick(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default StoreCard;
