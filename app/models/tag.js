import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    tagName: { type: String, default: "" },
  },
  { collection: "tag" }
);

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
