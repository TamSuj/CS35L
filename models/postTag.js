import mongoose from "mongoose";

const postTagSchema = new mongoose.Schema(
  {
    postId: { type: String, required: true, default: null },
    tagName: { type: String, default: null },
  },
  { collection: "postTag" }
);

export default postTagSchema;
