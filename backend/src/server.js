const express = require("express");
require("dotenv").config();

const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const calendarRoutes = require("./routes/calendarRoutes");
const heatmapRoutes = require("./routes/heatmapRoutes");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/heatmap", heatmapRoutes);

app.get("/", (req, res) => {
  res.send("Bakers_at_Home API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});