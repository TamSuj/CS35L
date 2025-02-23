import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    tagName: { type: String, default: null },
  },
  { collection: "tag" }
);

export default tagSchema;
