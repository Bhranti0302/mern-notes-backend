const express = require("express");

const {
  getAllNotes,
  createNote,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ================= PROTECTED ROUTES =================
router.get("/", protect, getAllNotes);
router.get("/:id", protect, getSingleNote);
router.post("/", protect, createNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

module.exports = router;
