const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const collectionRoutes = require("./routes/collectionRoutes");

const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/collections", collectionRoutes);

app.use(notFound)
app.use(errorHandler)

module.exports = app;
