import { useState } from "react";
import "../styles/admin.css";

const AddStoreForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    ownerId: 1, // TODO: Replace with real selected owner
    email: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/admin/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Store created successfully!");
      setFormData({
        name: "",
        ownerId: 1,
        email: "",
        address: "",
        password: "",
      });
    } else {
      alert("Error creating store.");
    }
  };

  return (
    <div className="form-container">
      <h3>Add New Store</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Store Name"
          required
        />
        <input
          name="ownerId"
          value={formData.ownerId}
          onChange={handleChange}
          placeholder="Owner ID"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Create Store</button>
      </form>
    </div>
  );
};

export default AddStoreForm;
