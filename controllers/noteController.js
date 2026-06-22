const Note = require("../models/Note");

// ============== Create Note ==============
exports.createNote = async (req, res) => {
  try {
    const { title, content, tags, collection } = req.body;

    const note = await Note.create({
      title,
      content,
      tags,
      collection,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
