const express = require("express");

const { register, login, logout } = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../validators/authValidator");
const validateRequest = require("../middlewares/validateRequest")
const { protect } = require("../middlewares/authMiddleware");
const {authLimiter} = require("../middlewares/rateLimitMiddleware")

const router = express.Router();


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria Lipa
 *               email:
 *                 type: string
 *                 example: maria@lipa.com
 *               password:
 *                 type: string
 *                 example: Test@1234
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user already exists
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: maria@lipa.com
 *               password:
 *                 type: string
 *                 example: Test@1234
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Authentication required
 */

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
