const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const {
  getMe,
  updateMe,
  deleteMe,
  getAllUsers,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const { restrictTo } = require("../middlewares/roleMiddleware");

const router = express.Router();

// For Logged-In user
router.get("/me",protect,getMe)
router.put("/me", protect, updateMe);
router.delete("/me", protect, deleteMe);

// For Admin
router.get("/", protect, restrictTo("admin"), getAllUsers);
router.put("/:id", protect, restrictTo("admin"), updateUser);
router.delete("/:id", protect, restrictTo("admin"), deleteUser);



module.exports = router;
