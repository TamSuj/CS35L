import mongoose from "mongoose";

const postTagSchema = new mongoose.Schema(
  {
    postId: { type: String, required: true, default: null },
    tagName: { type: String, default: null },
  },
  { collection: "postTag" }
);

const PostTag = mongoose.model("PostTag", postTagSchema);
export default PostTag;
