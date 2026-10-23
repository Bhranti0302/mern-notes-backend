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
const getMyNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  const notes = await Note.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    results: notes.length,
    notes,
  });
});

//================ Get All note ==================
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();

  res.status(200).json({
    success: true,
    results: notes.length,
    notes,
  });
});
//================ Update note ==================
// For both logged-In User
const updateNote = asyncHandler(async (req, res) => {
  const { title, content, tags, category } = req.body;

  const filter = { _id: req.params.id };

  // Regular users can update only their own notes.
  if (req.user.role !== "admin") {
    filter.user = req.user._id;
  }

  const note = await Note.findByIdAndUpdate(
    filter,
    { title, content, tags, category }, {
      returnDocument: "after",
      runValidators:true,
    }
  )

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found or you are not authorized to update",
    });
  }

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note: {
      id: note._id,
      title: note.title,
      content: note.content,
      category: note.category,
      tags: note.tags,
    },
  });
})

//================ Delete note ==================
const deleteNote = asyncHandler(async (req, res) => {
  const filter = { _id: req.params.id };

  // Regular users can delete only their own notes.
  // Admins can delete any note.
  if (req.user.role !== "admin") {
    filter.user = req.user._id;
  }

  const note = await Note.findOneAndDelete(filter);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found or you are not authorized to delete it",
    });
  }

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});

module.exports = { createNote, getMyNote, getAllNotes,updateNote,deleteNote };


// only for logged user
// const updateNote = asyncHandler(async (req, res) => {
//   const { title, content, tags, category } = req.body;

//   const note = await Note.findByIdAndUpdate(
//     {
//       _id: req.params.id,
//       user: req.user._id,
//     },
//     {
//       title,
//       content,
//       tags,
//       category,
//     },
//     {
//       returnDocument: "after",
//       runValidators: true,
//     },
//   );

//   if (!note) {
//     return res.status(404).json({
//       success: false,
//       message: "Note not found or you are not authorized to update"
//     })
//   }

//   res.status(200).json({
//     success: true,
//     message: "Note updated successfully",
//     note: {
//       id: note._id,
//       title: note.title,
//       content: note.content,
//       category: note.category,
//       tags: note.tags,
//     },
//   });
// })


// only for admin
//================ Update note - Admin ==================
// const updateNote = asyncHandler(async (req, res) => {
//   const { title, content, tags, category } = req.body;

//   const note = await Note.findByIdAndUpdate(
//     req.params.id,
//     {
//       title,
//       content,
//       tags,
//       category,
//     },
//     {
//       returnDocument: "after",
//       runValidators: true,
//     }
//   );

//   if (!note) {
//     return res.status(404).json({
//       success: false,
//       message: "Note not found",
//     });
//   }

//   res.status(200).json({
//     success: true,
//     message: "Note updated successfully",
//     note: {
//       id: note._id,
//       title: note.title,
//       content: note.content,
//       tags: note.tags,
//       category: note.category,
//     },
//   });
// });