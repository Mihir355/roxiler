import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? "https://roxiler-be34.onrender.com/api/auth/signup"
      : "https://roxiler-be34.onrender.com/api/auth/login";

    const payload = isSignup
      ? form
      : { email: form.email, password: form.password };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Authentication failed");
      return;
    }

    // Store user ID if needed
    localStorage.setItem("userId", data.id);

    // Redirect by role
    switch (data.role) {
      case "admin":
        navigate("/admin");
        break;
      case "store_owner":
        navigate("/store");
        break;
      case "user":
        navigate("/user");
        break;
      default:
        alert("Unknown role");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-toggle">
        <div
          className={`toggle-option ${!isSignup ? "active" : ""}`}
          onClick={() => setIsSignup(false)}
        >
          Login
        </div>
        <div
          className={`toggle-option ${isSignup ? "active" : ""}`}
          onClick={() => setIsSignup(true)}
        >
          Sign Up
        </div>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
        {isSignup && (
          <>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              id="address"
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          id="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
      </form>
    </div>
  );
};

export default AuthForm;
