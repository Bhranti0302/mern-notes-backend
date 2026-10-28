const rateLimit = require("express-rate-limit");

const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // 10 AI requests per user
  keyGenerator: (req) => req.user._id.toString(),
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many AI requests. Please try again after 15 minutes.",
  },
});

module.exports = { aiRateLimiter };
