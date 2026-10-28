const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("@exortek/express-mongo-sanitize");

const errorMiddleware = require("./middlewares/errorMiddleware")

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const aiRoutes = require("./routes/aiRoutes")

const app = express();

console.log("App.js loaded");

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.originalUrl);
  next();
});

// Middleware
app.use(express.json());
app.use(mongoSanitize());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-notes-backend-nxy7.onrender.com",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(helmet());

// Test Routes
// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Note App is running",
//   });
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/ai", aiRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Notes App API is running",
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


// ✅ Centralized error handling
// ✅ Helmet security headers
// ✅ Authentication rate limiting
// ✅ CORS configuration
// ✅ Environment variable validation
// ✅ Secure JWT cookie settings
// ✅ NoSQL injection protection
// ✅ Authentication request validation
// ✅ Note creation and update validation