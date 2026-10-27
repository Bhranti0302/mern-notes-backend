const express = require("express");

const { register, login, logout } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const {authLimiter} = require("../middlewares/rateLimitMiddleware")

const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/login",authLimiter, login);

router.post("/logout",protect, logout);

module.exports = router;
