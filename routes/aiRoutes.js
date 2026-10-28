const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const {
  suggestNote,
  summarizeNote,
  improvedNote,
  extractActionItems,
} = require("../controllers/aiController");
const { aiRateLimiter } = require("../middlewares/aiRateLimiter");

const router = express.Router();


/**
 * @swagger
 * /api/ai/suggest:
 *   post:
 *     summary: Suggest a category, tags, and improved content for a note
 *     tags: [AI Features]
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
 *                 example: Learn Express Middleware
 *               content:
 *                 type: string
 *                 example: Understand middleware and error handling
 *     responses:
 *       200:
 *         description: AI suggestions generated successfully
 *       400:
 *         description: Title or content is missing
 *       401:
 *         description: Authentication required
 *       429:
 *         description: AI request limit exceeded
 *       502:
 *         description: AI service unavailable
 */

/**
 * @swagger
 * /api/ai/summarize/{noteId}:
 *   post:
 *     summary: Summarize a note using AI
 *     tags: [AI Features]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Note MongoDB ID
 *     responses:
 *       200:
 *         description: Note summarized successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Note not found
 *       429:
 *         description: AI request limit exceeded
 *       502:
 *         description: AI service unavailable
 */

/**
 * @swagger
 * /api/ai/improve/{noteId}:
 *   post:
 *     summary: Improve a note's writing using AI
 *     tags: [AI Features]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Note MongoDB ID
 *     responses:
 *       200:
 *         description: Note improved successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Note not found
 *       429:
 *         description: AI request limit exceeded
 *       502:
 *         description: AI service unavailable
 */

/**
 * @swagger
 * /api/ai/action-items/{noteId}:
 *   post:
 *     summary: Extract action items from a note using AI
 *     tags: [AI Features]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Note MongoDB ID
 *     responses:
 *       200:
 *         description: Action items extracted successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Note not found
 *       429:
 *         description: AI request limit exceeded
 *       502:
 *         description: AI service unavailable
 */


router.post("/suggest", protect, aiRateLimiter, suggestNote);

router.post("/summarize/:noteId", protect, aiRateLimiter, summarizeNote);

router.post("/improve/:noteId", protect, aiRateLimiter, improvedNote);

router.post(
  "/action-items/:noteId",
  protect,
  aiRateLimiter,
  extractActionItems,
);

module.exports = router;
