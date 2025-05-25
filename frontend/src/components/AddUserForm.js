import { useState } from "react";
import "../styles/admin.css";

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
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

    const res = await fetch(
      "https://roxiler-be34.onrender.com/api/admin/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (res.ok) {
      alert("User created successfully!");
      setFormData({
        name: "",
        email: "",
        address: "",
        role: "",
        password: "",
      });
    } else {
      alert("Error creating user.");
    }
  };

  return (
    <div className="form-container">
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
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
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
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
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
