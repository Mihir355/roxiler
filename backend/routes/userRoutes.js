const express = require("express");
const router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcrypt");

router.get("/stores", async (req, res) => {
  const { q } = req.query;

  try {
    let query = "SELECT * FROM stores";
    let values = [];

    if (q) {
      query += " WHERE LOWER(name) LIKE $1 OR LOWER(address) LIKE $1";
      values.push(`%${q.toLowerCase()}%`);
    }

    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stores" });
  }
});

router.post("/review", async (req, res) => {
  const { userId, storeId, rating } = req.body;

  try {
    await db.query(
      `INSERT INTO reviews (user_id, store_id, rating)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, store_id) DO UPDATE SET rating = EXCLUDED.rating`,
      [userId, storeId, rating]
    );

    res.json({ message: "Rating submitted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit rating" });
  }
});

router.get("/stores-with-ratings/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await db.query(
      `
      SELECT s.id, s.name, s.address,
        COALESCE(avg(r.rating), 0)::float AS "overallRating",
        ur.rating AS "yourRating"
      FROM stores s
      LEFT JOIN reviews r ON s.id = r.store_id
      LEFT JOIN (
        SELECT store_id, rating FROM reviews WHERE user_id = $1
      ) ur ON s.id = ur.store_id
      GROUP BY s.id, ur.rating
    `,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching store ratings" });
  }
});

module.exports = router;
