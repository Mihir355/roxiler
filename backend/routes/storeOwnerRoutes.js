const express = require("express");
const router = express.Router();
const db = require("../models/db");

// 1. Get store stats: average rating and total reviews
router.get("/stats/:ownerId", async (req, res) => {
  const ownerId = req.params.ownerId;

  try {
    const storeResult = await db.query(
      "SELECT id FROM stores WHERE owner_id = $1",
      [ownerId]
    );

    if (storeResult.rows.length === 0)
      return res.status(404).json({ error: "Store not found for owner" });

    const storeId = storeResult.rows[0].id;

    const avgResult = await db.query(
      "SELECT AVG(rating)::numeric(3,2) AS average, COUNT(*) AS total FROM reviews WHERE store_id = $1",
      [storeId]
    );

    res.json({
      storeId,
      average: avgResult.rows[0].average || 0,
      totalReviews: parseInt(avgResult.rows[0].total),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// 2. Get all customer reviews for a store
router.get("/reviews/:storeId", async (req, res) => {
  const storeId = req.params.storeId;

  try {
    const result = await db.query(
      `SELECT u.name, r.rating, r.comment, r.created_at
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.store_id = $1
       ORDER BY r.created_at DESC`,
      [storeId]
    );

    const reviews = result.rows.map((r) => ({
      name: r.name,
      rating: r.rating,
      date: r.created_at.toISOString().split("T")[0],
      comment: r.comment,
    }));

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// 3. Rating distribution for a store
router.get("/rating-distribution/:storeId", async (req, res) => {
  const storeId = req.params.storeId;

  try {
    const result = await db.query(
      `SELECT rating, COUNT(*) as count FROM reviews WHERE store_id = $1 GROUP BY rating`,
      [storeId]
    );

    const totalResult = await db.query(
      `SELECT COUNT(*) FROM reviews WHERE store_id = $1`,
      [storeId]
    );

    const total = parseInt(totalResult.rows[0].count);
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    result.rows.forEach((row) => {
      distribution[row.rating] = Math.round((row.count / total) * 100);
    });

    res.json(distribution);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch rating distribution" });
  }
});

module.exports = router;
