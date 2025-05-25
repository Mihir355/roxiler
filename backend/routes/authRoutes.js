// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models/db");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, address, password } = req.body;

  try {
    // Check for existing email
    const existing = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO users (name, email, address, password, role)
       VALUES ($1, $2, $3, $4, 'user') RETURNING id, name, email, role`,
      [name, email, address, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists in `users` table
    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const storeResult = await db.query(
      "SELECT * FROM stores WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 1) {
      const user = userResult.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ error: "Invalid credentials" });

      return res.json({ id: user.id, role: user.role });
    }

    if (storeResult.rows.length === 1) {
      const store = storeResult.rows[0];
      const isMatch = await bcrypt.compare(password, store.password);
      if (!isMatch)
        return res.status(401).json({ error: "Invalid credentials" });

      return res.json({ id: store.id, role: "store_owner" }); // role not stored here
    }

    res.status(404).json({ error: "User not found" });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
