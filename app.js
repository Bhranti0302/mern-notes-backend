const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Test Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Note App is running",
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
