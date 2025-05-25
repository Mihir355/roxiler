const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes"); // new
const userRoutes = require("./routes/userRoutes"); // new
const storeOwnerRoutes = require("./routes/storeOwnerRoutes");

app.use("/api/store", storeOwnerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); // for dashboard APIs

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
