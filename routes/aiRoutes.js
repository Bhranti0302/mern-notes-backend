const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { suggestNote } = require("../controllers/aiController");

const router = express.Router();

router.post("/suggest", protect, suggestNote);

router.post("/summarize/:noteId", protect, summarizeNote);

module.exports = router