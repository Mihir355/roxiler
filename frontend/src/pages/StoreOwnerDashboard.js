import React, { useEffect, useState } from "react";
import StoreOwnerNavbar from "../components/StoreOwnerNavbar";
import StoreStatsCards from "../components/StoreStatsCards";
import CustomerReviewsList from "../components/CustomerReviewsList";
import RatingDistributionChart from "../components/RatingDistributionChart";
import "../styles/StoreOwnerDashboard.css";

const StoreOwnerDashboard = () => {
  const [average, setAverage] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [distribution, setDistribution] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  const ownerId = localStorage.getItem("userId");
  const [storeId, setStoreId] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch(
        `http://localhost:5000/api/store/stats/${ownerId}`
      );
      const data = await res.json();
      setAverage(data.average);
      setTotalReviews(data.totalReviews);
      setStoreId(data.storeId);
    };

    fetchStats();
  }, [ownerId]);

  useEffect(() => {
    if (!storeId) return;

    const fetchReviews = async () => {
      const res = await fetch(
        `http://localhost:5000/api/store/reviews/${storeId}`
      );
      const data = await res.json();
      setReviews(data);
    };

    const fetchDistribution = async () => {
      const res = await fetch(
        `http://localhost:5000/api/store/rating-distribution/${storeId}`
      );
      const data = await res.json();
      setDistribution(data);
    };

    fetchReviews();
    fetchDistribution();
  }, [storeId]);

  return (
    <div>
      <StoreOwnerNavbar />

      <div className="stats-section">
        <StoreStatsCards average={average} totalReviews={totalReviews} />
      </div>

      <div className="reviews-section">
        <CustomerReviewsList reviews={reviews} />
      </div>

      <div className="distribution-section">
        <RatingDistributionChart distribution={distribution} />
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
