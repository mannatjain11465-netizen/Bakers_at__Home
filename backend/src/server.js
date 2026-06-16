const express = require("express");
require("dotenv").config();

const customerRoutes = require("./routes/customerRoutes");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("Bakers_at_Home API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});