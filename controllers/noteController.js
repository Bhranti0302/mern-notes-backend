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
//================ Get my notes with search and filters ==================

const getMyNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  const { q, category, tag, isPinned } = req.query;

  // Pagination
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const skip = (page - 1) * limit;

  // Filter notes belonging to the logged-in user
  const filter = {
    user: req.user._id,
  };

  // Search by keyword
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } },
    ];
  }

  // Filter by category
  if (category) {
    filter.category = category;
  }

  // Filter by tag
  if (tag) {
    filter.tags = { $in: [tag] };
  }

  // Filter by pinned status
  if (isPinned === "true") {
    filter.isPinned = true;
  } else if (isPinned === "false") {
    filter.isPinned = false;
  }

  // Get total matching notes
  const totalNotes = await Note.countDocuments(filter);

  // Get notes for the requested page
  const notes = await Note.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    success: true,
    results: notes.length,
    pagination: {
      currentPage: page,
      limit,
      totalNotes,
      totalPages: Math.ceil(totalNotes / limit),
      hasNextPage: page < Math.ceil(totalNotes / limit),
      hasPrevPage: page > 1,
    },
    notes,
  });
});


//================ Get All note ==================

const getAllNotes = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const skip = (page - 1) * limit;

  const totalNotes = await Note.countDocuments();

  const notes = await Note.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    success: true,
    results: notes.length,
    pagination: {
      currentPage: page,
      limit,
      totalNotes,
      totalPages: Math.ceil(totalNotes / limit),
      hasNextPage: page < Math.ceil(totalNotes / limit),
      hasPrevPage: page > 1,
    },
    notes,
  });
});

//================ Update note ==================
// For both logged-In User
const updateNote = asyncHandler(async (req, res) => {
  const { title, content, tags, category, isPinned } = req.body;

  const filter = { _id: req.params.id };

  // Regular users can update only their own notes.
  // Admins can update any note.
  if (req.user.role !== "admin") {
    filter.user = req.user._id;
  }

  // Build an update object containing only supplied fields.
  const updates = {};

  if (title !== undefined) updates.title = title;
  if (content !== undefined) updates.content = content;
  if (tags !== undefined) updates.tags = tags;
  if (category !== undefined) updates.category = category;

  // Support pinning and unpinning.
  if (isPinned !== undefined) {
    if (typeof isPinned !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isPinned must be a boolean",
      });
    }

    updates.isPinned = isPinned;
  }

  const note = await Note.findOneAndUpdate(filter, updates, {
    new: true,
    runValidators: true,
  });

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found or you are not authorized to update it",
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
      isPinned: note.isPinned,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    },
  });
});

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

const togglePin = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  note.isPinned = !note.isPinned;
  await note.save();

  res.status(200).json({
    success: true,
    message: "Pin status updated",
    note,
  });
});

module.exports = {
  createNote, getMyNote, getAllNotes, updateNote, deleteNote, togglePin
 };


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


//================ Get my notes with search ==================
//================ Get my notes with search ==================