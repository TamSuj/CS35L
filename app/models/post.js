import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const postSchema = new mongoose.Schema(
  {
    postID: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4,
    },
    postTitle: {
      type: String,
      required: true,
    },
    textContent: { type: String, default: null },
    fileContent: { type: String, required: false, default: null },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likeCount: { type: Number, default: 0 },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: "Comment", default: [] },
    tags: { type: [String], default: [] },
  },
  { timestamps: true, collection: "post" }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
