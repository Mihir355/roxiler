import { useEffect, useState } from "react";
import "../styles/admin.css";

const StoreTable = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/stores")
      .then((res) => res.json())
      .then((data) => setStores(data))
      .catch((err) => console.error("Error fetching stores:", err));
  }, []);

  return (
    <div className="table-container">
      <h3>Store Management</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.average_rating || "N/A"}</td>
              <td>Edit/Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreTable;
