const User = require("../models/User");
const {generateAccessToken, generateRefreshToken} = require("../utils/generateToken");
const cookieOptions = require("../utils/cookieOptions");

// ================= SIGNUP =================
exports.refreshToken=(req,res)=>{

  // 1. Get refresh token from cookie
  const token=req.cookies.refreshToken;

  // 2. Check if token is provided
  if(!token){
    return res.status(401).json({
      success: false,
      message: "No refresh token provided",
    });
  }

  try{
    // 3. Verify token
    const decoded=JsonWebTokenError.verify(token, process.env.JWT_REFRESH_SECRET);

    // 4. Get user from the token
    const user = await User.findById(decoded.id).select("-password");

    // 5. Check if user exists
    if(!user || user.refreshToken !== token){
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      })
    }

    // 6. Generate new access token
    const newAccessToken=generateAccessToken(user._id);

    // 7. Send new access token in cookie
    res.cookie("token", newAccessToken, cookieOptions).status(200).json({
      success: true,
      message: "New access token generated",
    });
  }catch(err){
    return res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
}

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 2. Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // 3. Generate token
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // 4. Send response (cookie only)
    res
      .cookie("token", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 2. Check account status
    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Account is not active",
      });
    }

    // 3. Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4. Generate token
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // 5. Send response (cookie only)
    res
    .cookie("token", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions).status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// ================= LOGOUT =================
exports.logout = (req, res) => {
  const token = req.cookies.token;

  if(token){
    const user = await User.findOne({ refreshToken: token });

    if(user){
      user.refreshToken = null;
      await user.save();
    }

    req.session.destroy(() => {
      res
      .clearCookie("token", cookieOptions)
      .clearCookie("refreshToken", cookieOptions).status(200).json({
        success: true,
        message: "User logged out successfully",
      });
    });

  }
};
