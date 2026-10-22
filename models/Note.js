const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      minlength: 3,
      maxlength: 250,
    },

    category: {
      type: String,
      enum: [
        "Remember",
        "Learning",
        "Food Recipe",
        "Work",
        "Ideas",
        "Personal",
        "Other",
      ],
      default: "Other",
    },

    tags: {
      type: [String],
      default: [],
    },

    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);



module.exports = mongoose.model("Note", noteSchema);
