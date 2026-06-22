const express = require("express");
const {
    getNotes,
    createNote,
    getNote,
    updateNote,
    deleteNote,
} = require("../controllers/noteController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ================= PROTECTED ROUTES =================
router.get("/", protect, getNotes);
router.get("/:id", protect, getNote);
router.post("/", protect, createNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

module.exports = router;