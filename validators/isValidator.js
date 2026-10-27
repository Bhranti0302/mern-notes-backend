const { param } = require("express-validator");

const validateNoteId = [param("id").isMongoId().withMessage("Invalid note ID")];

module.exports = { validateNoteId };
