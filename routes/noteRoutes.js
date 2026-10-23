const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const { restrictTo } = require("../middlewares/roleMiddleware");

const { createNote, getMyNote, getAllNotes,updateNote,deleteNote } = require("../controllers/noteController");

const router = express.Router();

// For logged-In user
router.post("/", protect, restrictTo("user"), createNote);
router.get("/", protect, restrictTo("user"), getMyNote);

// For admin
router.get("/getNotes", protect, restrictTo("admin"), getAllNotes);

// For both
router.patch("/:id", protect, restrictTo("user", "admin"), updateNote);
router.delete("/:id", protect, restrictTo("user", "admin"), deleteNote);



module.exports = router;
