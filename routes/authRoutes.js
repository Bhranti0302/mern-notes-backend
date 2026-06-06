const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController.js');

const protect = require('../middleware/authMiddleware.js');

const router = express.Router();

// ================= PUBLIC ROUTES =================
router.post('/register', registerUser);
router.post('/login', loginUser);

// ================= PROTECTED ROUTES =================
// Logout
router.post("/logout", protect, logoutUser);

// Example: Get current user
router.get("/me", protect, (req, res) => {
  res.json({
    message: "User data fetched successfully",
    user: req.user,
  });
});

module.exports = router;