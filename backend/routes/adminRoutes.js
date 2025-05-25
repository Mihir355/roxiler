const express = require("express");
const router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcrypt");

// 1. Total number of users
router.get("/users/count", async (req, res) => {
  try {
    const result = await db.query("SELECT COUNT(*) FROM users");
    res.json({ totalUsers: parseInt(result.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: "Error fetching user count" });
  }
});

// 2. Total number of stores
router.get("/stores/count", async (req, res) => {
  try {
    const result = await db.query("SELECT COUNT(*) FROM stores");
    res.json({ totalStores: parseInt(result.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: "Error fetching store count" });
  }
});

// 3. Total number of reviewers
router.get("/reviewers/count", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT COUNT(DISTINCT user_id) FROM reviews"
    );
    res.json({ totalReviewers: parseInt(result.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: "Error fetching reviewer count" });
  }
});

// 4. Get user details with ratings if store owner
router.get("/users", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        u.id, u.name, u.email, u.address, u.role,
        COALESCE((
          SELECT ROUND(AVG(r.rating), 2)
          FROM stores s
          JOIN reviews r ON r.store_id = s.id
          WHERE s.owner_id = u.id
        ), NULL) AS average_rating
      FROM users u
      ORDER BY u.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user details" });
  }
});

// 5. Get store details with rating
router.get("/stores", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        s.id, s.name, s.email, s.address,
        ROUND(AVG(r.rating), 2) AS average_rating,
        COUNT(r.id) AS total_reviews
      FROM stores s
      LEFT JOIN reviews r ON r.store_id = s.id
      GROUP BY s.id
      ORDER BY average_rating DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching store details" });
  }
});

// 6. Create new user
router.post("/users", async (req, res) => {
  const { name, email, address, role, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO users (name, email, address, role, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, address, role, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// 7. Create new store
router.post("/stores", async (req, res) => {
  const { name, ownerId, email, address, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO stores (name, owner_id, email, address, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, ownerId, email, address, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating store" });
  }
});

// Add this route for overview stats
router.get("/overview", async (req, res) => {
  try {
    // total users
    const usersResult = await db.query("SELECT COUNT(*) FROM users");
    // total stores
    const storesResult = await db.query("SELECT COUNT(*) FROM stores");
    // total reviewers (number of users who gave ratings)
    const reviewersResult = await db.query(
      "SELECT COUNT(DISTINCT user_id) FROM reviews"
    );

    res.json({
      users: parseInt(usersResult.rows[0].count),
      stores: parseInt(storesResult.rows[0].count),
      ratings: parseInt(reviewersResult.rows[0].count),
    });
  } catch (error) {
    console.error("Error fetching overview stats:", error);
    res.status(500).json({ error: "Server error fetching overview stats" });
  }
});

module.exports = router;
