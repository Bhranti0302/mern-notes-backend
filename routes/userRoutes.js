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


/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Authentication required
 */
router.get("/me", protect, getMe);

/**
 * @swagger
 * /api/user/me:
 *   put:
 *     summary: Update the logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Bhranti
 *               email:
 *                 type: string
 *                 format: email
 *                 example: bhranti@example.com
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Authentication required
 */
router.put("/me", protect, updateMe);

/**
 * @swagger
 * /api/user/me:
 *   delete:
 *     summary: Delete the logged-in user's account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Authentication required
 */
router.delete("/me", protect, deleteMe);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     description: Admin access required.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.get("/", protect, restrictTo("admin"), getAllUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Admin access required.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User's MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input or user ID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: User not found
 */
router.put("/:id", protect, restrictTo("admin"), updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Admin access required.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User's MongoDB ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: User not found
 */
router.delete("/:id", protect, restrictTo("admin"), deleteUser);




module.exports = router;
