const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

// ========= Get logged-in user's profile =========
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User profile fetched successfully",
    user: req.user
  })
})

// ============= Update logged-in user =============
const updateMe = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      returnDocument: "after",
      runValidators: true,
    },
  ).select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// ============= Delete logged-in user =============
const deleteMe = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message:"User not found"
    })
  }

  res.status(200).json({
    success: true,
    message:"Your account has been deleted"
  })
})

// ============= Get all user (admin) =============
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password")
  
  res.status(200).json({
    results: users.length,
    users
  })
})

// ============= Admin updates any user =============
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  }).select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message:"User not found"
    })
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
})

// ============= Admin delete any user =============
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(401).json({
      success: false,
      message:"User not found"
    })
  }

  res.status(200).json({
    success: true,
    message:"User deleted successfully"
  })
}

module.exports = {
  getMe,
  updateMe,
  deleteMe,
  getAllUsers,
  updateUser,
  deleteUser
};
