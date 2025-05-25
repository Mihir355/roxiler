import React from "react";
import "../styles/StoreOwnerDashboard.css";

const CustomerReviewsList = ({ reviews }) => (
  <div className="reviews-container">
    <h3>Customer Reviews</h3>
    {reviews.length === 0 && <p>No reviews yet.</p>}
    {reviews.map((review, index) => (
      <div key={index} className="review-card">
        <div className="review-header">
          <strong>{review.name}</strong>
          <span>{review.rating} ⭐</span>
          <small>{review.date}</small>
        </div>
        <p>{review.comment}</p>
      </div>
    ))}
  </div>
);

export default CustomerReviewsList;
