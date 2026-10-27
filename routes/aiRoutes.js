const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { suggestNote,summarizeNote,improveNote,extractActionItems } = require("../controllers/aiController");

const router = express.Router();

router.post("/suggest", protect, suggestNote);

router.post("/summarize/:noteId", protect, summarizeNote);

router.post("/improve/:noteId", protect, improveNote);

router.post("/action-items/:noteId", protect, extractActionItems);

module.exports = router