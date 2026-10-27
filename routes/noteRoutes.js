const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const { restrictTo } = require("../middlewares/roleMiddleware");
const validateRequest = require("../middlewares/validateRequest");

const {
  createNote,
  getMyNote,
  getAllNotes,
  updateNote,
  deleteNote,
  togglePin,
} = require("../controllers/noteController");

const {
  createNoteValidator,
  updateNoteValidator,
} = require("../validators/noteValidator");

const router = express.Router();

// Create note — logged-in users
router.post("/", protect, createNoteValidator, validateRequest, createNote);

// Get my notes — users
router.get("/", protect, restrictTo("user"), getMyNote);

// Get all notes — admins
router.get("/getNotes", protect, restrictTo("admin"), getAllNotes);

// Update note — users and admins
router.patch(
  "/:id",
  protect,
  restrictTo("user", "admin"),
  updateNoteValidator,
  validateRequest,
  updateNote,
);

// Delete note — users and admins
router.delete("/:id", protect, restrictTo("user", "admin"), deleteNote);

// Pin or unpin note — users
router.patch("/:id/pin", protect, restrictTo("user"), togglePin);

module.exports = router;
