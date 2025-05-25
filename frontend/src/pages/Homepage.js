import React from "react";
import Navbar from "../components/Navbar";
import AuthForm from "../components/AuthForm";
import Features from "../components/Features";
import "../styles/home.css";

const HomePage = () => (
  <div>
    <Navbar />
    <div className="home-content">
      <div className="hero-section">
        <h1>Professional Store Rating Platform</h1>
        <p>
          A comprehensive store rating system with role-based access for
          administrators, store owners, and customers. Rate stores, manage
          users, and track performance.
        </p>
      </div>
      <AuthForm />
      <Features />
    </div>
  </div>
);

export default HomePage;
