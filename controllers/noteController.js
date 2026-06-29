const Note = require("../models/Note");

// ============== Create Note ==============
exports.createNote = async (req, res) => {
  try {
      const { title, content, tags, collection } = req.body;
      console.log("BODY:", req.body);

    // ✅ Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const note = await Note.create({
      title,
      content,
      tags,
      collection,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============= Get All Notes ==============
exports.getAllNotes = async (req, res) => {
  try {
    const { search, tag, collection, page = 1, limit = 10, sort } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);

    let filter = { user: req.user.id };

    // 🔍 Search (title + content)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    // 🏷 Tag filter
    if (tag) {
      filter.tags = { $in: [tag] };
    }

    // 📁 Collection filter
    if (collection) {
      filter.collection = collection;
    }

    // 📊 Sorting
    let sortOption = { createdAt: -1 }; // default latest
    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    // 📄 Total count
    const total = await Note.countDocuments(filter);

    // 📄 Fetch notes
    const notes = await Note.find(filter)
      .populate("collection", "name")
      .select("-__v")
      .sort(sortOption)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: notes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============= Get Single Note ==============
exports.getSingleNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    })
      .populate("collection", "name")
      .select("-__v");

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============= Update Note ==============
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )
      .populate("collection", "name")
      .select("-__v");

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============= Delete Note ==============
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
