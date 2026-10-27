const asyncHandler = require("../utils/asyncHandler");
const Note = require("../models/Note")

const suggestNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
    });
  }

  const text = `${title} ${content}`.toLowerCase();

  let category = "Other";

  if (text.includes("learn") || text.includes("mongodb")) {
    category = "Learning";
  } else if (text.includes("recipe") || text.includes("cook")) {
    category = "Food Recipe";
  } else if (text.includes("work") || text.includes("meeting")) {
    category = "Work";
  } else if (text.includes("idea") || text.includes("project")) {
    category = "Ideas";
  }

  const suggestions = {
    category,
    tags: ["Notes", "Ideas", "Review"],
    improvedContent: content.trim(),
  };

  return res.status(200).json({
    success: true,
    message: "Mock AI suggestions generated successfully",
    suggestions,
  });
});

// Summarize a note
const summarizeNote = asyncHandler(async (req, res) => {
  const Note = require("../models/Note");

  const note = await Note.findOne({
    _id: req.params.noteId,
    user: req.user._id,
  });

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  // Temporary mock summary
  const words = note.content.trim().split(/\s+/);
  const summary = words.slice(0, 20).join(" ");

  return res.status(200).json({
    success: true,
    message: "Note summarized successfully (mock)",
    summary:
      words.length > 20 ? `${summary}...` : summary,
  });
});

// Improve note writing
const improveNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.noteId,
    user: req.user._id,
  });

  if (!note) {
    return res.status(404).json({
      success: false,
      message:"Note not found"
    })
  }

  // Temporary mock: clean up extra whitespace
  const improvedContent = note.content
    .trim()
    .replace(/\s+/g, " ");
  
  return res.status(200).json({
    success: true,
    message: "Note writing improved successfully (mock)",
    improvedContent,
  });
})

// Extract action items from a note
const extractActionItems = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.noteId,
    user: req.user._id,
  })

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found"
    })
  }

  // Temporary mock: split content into linnes
  const actionItems = note.content
    .split(/[.\n]/)
    .map((item) => item.trim())
    .filter((item) => /^(todo|task|action|need to|must|should|learn|understood|revise|remember to)/i.test(item))
  
  return res.status(200).json({
    success: true,
    message: "Action items extracted successfully (mock)",actionItems,
  })
})

module.exports = { suggestNote,summarizeNote,improveNote,extractActionItems };


