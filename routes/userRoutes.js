const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const { updateMe } = require("../controllers/userController");

const router = express.Router();

router.put("/me", protect, updateMe);

module.exports = router;
