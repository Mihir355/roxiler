import React from "react";
import "../styles/UserDashboard.css";
const StoreSearch = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      className="store-search-input"
      placeholder="Search stores by name or address..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default StoreSearch;
