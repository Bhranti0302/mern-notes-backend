const express = require("express");
const router = express.Router();

const {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
} = require("../controllers/collectionController");

const protect = require("../middleware/authMiddleware");

// Protect all routes
router.use(protect);

router.route("/").post(createCollection).get(getCollections);

router
  .route("/:id")
  .get(getCollectionById)
  .put(updateCollection)
  .delete(deleteCollection);

module.exports = router;
