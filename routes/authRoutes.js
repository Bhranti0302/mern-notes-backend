const express = require("express");

const { register, login, logout } = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../validators/authValidator");
const validateRequest = require("../middlewares/validateRequest")
const { protect } = require("../middlewares/authMiddleware");
const {authLimiter} = require("../middlewares/rateLimitMiddleware")

const router = express.Router();

router.post(
  "/register",
  authLimiter,
  registerValidator,
  validateRequest,
  register,
);

router.post("/login", authLimiter, loginValidator, validateRequest, login);

router.post("/logout",protect, logout);

module.exports = router;
