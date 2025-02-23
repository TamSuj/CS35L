const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentID: { type: String, required: true, unique: true, default: null },
    username: { type: String, default: null },
    content: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "comment" }
);
