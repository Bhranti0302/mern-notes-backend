const { body } = require("express-validator");

const createNoteValidator = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("content")
    .isString()
    .withMessage("Content must be a string")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 3, max: 250 })
    .withMessage("Content must be between 3 and 250 characters"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string")
    .isIn([
      "Remember",
      "Learning",
      "Food Recipe",
      "Work",
      "Ideas",
      "Personal",
      "Other",
    ])
    .withMessage("Invalid note category"),

  body("tags").optional().isArray().withMessage("Tags must be an array"),

  body("tags.*")
    .optional()
    .isString()
    .withMessage("Each tag must be a string")
    .trim()
    .notEmpty()
    .withMessage("Tags cannot be empty"),
];

const updateNoteValidator = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("content")
    .optional()
    .isString()
    .withMessage("Content must be a string")
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty")
    .isLength({ min: 3, max: 250 })
    .withMessage("Content must be between 3 and 250 characters"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string")
    .isIn([
      "Remember",
      "Learning",
      "Food Recipe",
      "Work",
      "Ideas",
      "Personal",
      "Other",
    ])
    .withMessage("Invalid note category"),

  body("tags").optional().isArray().withMessage("Tags must be an array"),

  body("tags.*")
    .optional()
    .isString()
    .withMessage("Each tag must be a string")
    .trim()
    .notEmpty()
    .withMessage("Tags cannot be empty"),

  body("isPinned")
    .optional()
    .isBoolean()
    .withMessage("isPinned must be true or false"),
];

module.exports = { createNoteValidator, updateNoteValidator };
