const mongoose=require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the note"],
      minlength: 2,
      maxlength: 100,
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Please provide content for the note"],
      minlength: 2,
      maxlength: 1000,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🏷️ Tags (for filtering/search)
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        trim: true,
      },
    ],

    // 📌 Pin important notes
    pinned: {
      type: Boolean,
      default: false,
    },

    // 🗂️ Soft delete (important for real apps)
    isDeleted: {
      type: Boolean,
      default: false,
    },

    // 🔐 Private / Public note
    isPublic:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  },
);

noteSchema.index({title:"text",content:"text"},{
    weights:{
        title:5,
        content:1
    }
});

module.exports=mongoose.model("Note",noteSchema);