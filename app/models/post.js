import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postID: {
      type: String,
      required: true,
      unique: true,
      default: () => require("uuid").v4(),
    },
    textContent: { type: String, default: null },
    fileContent: { type: String, required: false, default: null },
    username: { type: String, default: null },
    likeCount: { type: Number, default: 0 },
    comments: { type: [Number], default: [] },
    createdAt: { type: Date, default: Date.now },
    editedAt: { type: Date, default: Date.now },
    tags: { type: [String], default: [] },
  },
  { timestamps: true, collection: "post" }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
