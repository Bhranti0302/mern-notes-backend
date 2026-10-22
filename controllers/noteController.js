const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("../utils/asyncHandler");

//================ Create note ==================
const createNote = asyncHandler(async (req, res) => {
  const { title, content, category, tags } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  const note = await Note.create({
    user: user._id,
    title,
    content,
    category,
    tags,
  });

  return res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: {
      id: note._id,
      title: note.title,
      content: note.content,
      category: note.category,
      tags: note.tags,
      isPinned: note.isPinned,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    },
  });
});
//================ Get my note ==================

//================ Get note ==================
//================ Update note ==================
//================ Delete note ==================

module.exports = { createNote };
