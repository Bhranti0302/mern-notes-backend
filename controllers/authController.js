const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const cookieOptions = require("../utils/cookieOptions");
const asyncHandler = require("../utils/asyncHandler");

// ================= Register ======================
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  // 2. Create User
  const user = await User.create({
    name,
    email,
    password,
  });

  // 3. Generate Token
  const token = await generateToken(user._id);

  // 4. Send Cookie
  res.cookie("token", token, cookieOptions);

  // 5. Send Response
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// ================= Login ==================
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Check if user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // 2. Check password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // 3. Generate Token
  const token = await generateToken(user._id);

  // 4. Send Cookie
  res.cookie("token", token, cookieOptions);

  // 5. Send Response
  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// ================= Logout ==================
const logout = asyncHandler(async (req, res) => {
  // 1. Check if cookie exists
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not logged in",
    });
  }

  // 2. Clear Cookie
  res.clearCookie("token", cookieOptions);

  // 3. Send Response
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

module.exports = {
  register,
  login,
  logout,
};
