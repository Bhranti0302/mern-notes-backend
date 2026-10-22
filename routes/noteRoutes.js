const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const { restrictTo } = require("../middlewares/roleMiddleware");

const { createNote } = require("../controllers/noteController");

const router = express.Router();

router.post("/", protect, restrictTo("user"), createNote);

module.exports = router;
