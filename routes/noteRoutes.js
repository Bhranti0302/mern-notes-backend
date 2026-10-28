const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const { restrictTo } = require("../middlewares/roleMiddleware");
const validateRequest = require("../middlewares/validateRequest");


/**
 * @swagger
 * /api/note:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn MongoDB
 *               content:
 *                 type: string
 *                 example: Practice MongoDB queries and schemas
 *               category:
 *                 type: string
 *                 enum: [Remember, Learning, "Food Recipe", Work, Ideas, Personal, Other]
 *                 example: Learning
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [MongoDB, Backend]
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Invalid note data
 *       401:
 *         description: Authentication required
 */

/**
 * @swagger
 * /api/note:
 *   get:
 *     summary: Get the logged-in user's notes
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search notes by keyword
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Filter by tag
 *       - in: query
 *         name: isPinned
 *         schema:
 *           type: boolean
 *         description: Filter pinned notes
 *     responses:
 *       200:
 *         description: Notes retrieved successfully
 *       401:
 *         description: Authentication required
 */

/**
 * @swagger
 * /api/note/getNotes:
 *   get:
 *     summary: Get all notes
 *     description: Admin access required.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notes retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */

/**
 * @swagger
 * /api/note/{id}:
 *   patch:
 *     summary: Update a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [Remember, Learning, "Food Recipe", Work, Ideas, Personal, Other]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               isPinned:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       400:
 *         description: Invalid note data or ID
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Note not found
 */

/**
 * @swagger
 * /api/note/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note MongoDB ID
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       400:
 *         description: Invalid note ID
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Note not found
 */

/**
 * @swagger
 * /api/note/{id}/pin:
 *   patch:
 *     summary: Pin or unpin a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note MongoDB ID
 *     responses:
 *       200:
 *         description: Note pin status updated successfully
 *       400:
 *         description: Invalid note ID
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Note not found
 */


const {
  createNote,
  getMyNote,
  getAllNotes,
  updateNote,
  deleteNote,
  togglePin,
} = require("../controllers/noteController");

const {
  createNoteValidator,
  updateNoteValidator,
} = require("../validators/noteValidator");

const { validateNoteId } = require("../validators/isValidator");

const router = express.Router();

// Create note — logged-in users
router.post("/", protect, createNoteValidator, validateRequest, createNote);

// Get my notes — users
router.get("/", protect, restrictTo("user"), getMyNote);

// Get all notes — admins
router.get("/getNotes", protect, restrictTo("admin"), getAllNotes);

// Update note — users and admins
router.patch(
  "/:id",
  protect,
  restrictTo("user", "admin"),
  validateNoteId,
  updateNoteValidator,
  validateRequest,
  updateNote,
);

// Delete note — users and admins
router.delete(
  "/:id",
  protect,
  restrictTo("user", "admin"),
  validateNoteId,
  validateRequest,
  deleteNote,
);

// Pin or unpin note — users
router.patch(
  "/:id/pin",
  protect,
  restrictTo("user"),
  validateNoteId,
  validateRequest,
  togglePin,
);

module.exports = router;
