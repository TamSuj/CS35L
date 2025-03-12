import mongoose from "mongoose";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const tagSchema = new mongoose.Schema(
  {
    //tagName: { type: String, default: null },
    tagName: { type: String, required: true, unique: true },
    color: { type: String, default: getRandomColor }
  },
  { collection: "tag" }
);

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
