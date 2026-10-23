const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const errorMiddleware = require("./middlewares/errorMiddleware")

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes")

const app = express();

console.log("App.js loaded");

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.originalUrl);
  next();
});

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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/note",noteRoutes)

app.delete("/test-delete", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DELETE route works",
  });
});

// Handle unknown routes
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global error handler — must be last
app.use(errorMiddleware);



module.exports = app;
