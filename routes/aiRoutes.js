const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const {
  suggestNote,
  summarizeNote,
  improvedNote,
  extractActionItems,
} = require("../controllers/aiController");
const { aiRateLimiter } = require("../middlewares/aiRateLimiter");

const router = express.Router();

router.post("/suggest", protect, aiRateLimiter, suggestNote);

router.post("/summarize/:noteId", protect, aiRateLimiter, summarizeNote);

router.post("/improve/:noteId", protect, aiRateLimiter, improvedNote);

router.post(
  "/action-items/:noteId",
  protect,
  aiRateLimiter,
  extractActionItems,
);

module.exports = router;
