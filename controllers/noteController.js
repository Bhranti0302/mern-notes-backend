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

// ============= Get all Notes ==============
exports.getAllNotes = async (req, res) => {
    try {
        const { search, tag, page = 1, limit = 10 } = req.query;

        let filter = { user: req.user.id };

        // Search
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
            ];
        }

        // Tag Filter
        if (tag) {
            filter.tags = tag;
        }

        const notes = await Note.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        
        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};