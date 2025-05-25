import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import StoreSearch from "../components/StoreSearch";
import StoreCard from "../components/StoreCard";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [stores, setStores] = useState([]);

  const userId = localStorage.getItem("userId");

  const fetchStores = async () => {
    try {
      const res = await fetch(
        `https://roxiler-be34.onrender.com/api/user/stores-with-ratings/${userId}`
      );
      const data = await res.json();
      setStores(data);
    } catch (err) {
      console.error("Failed to load stores", err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRatingUpdate = async (storeId, rating) => {
    const res = await fetch(
      "https://roxiler-be34.onrender.com/api/user/review",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: Number(userId), storeId, rating }),
      }
    );

    if (res.ok) {
      const updated = stores.map((s) =>
        s.id === storeId ? { ...s, yourRating: rating } : s
      );
      setStores(updated);
    } else {
      alert("Rating failed");
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="search-container">
        <StoreSearch query={searchQuery} setQuery={setSearchQuery} />
      </div>

      <div className="store-cards-container">
        {filteredStores.map((store) => (
          <StoreCard key={store.id} store={store} onRate={handleRatingUpdate} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
