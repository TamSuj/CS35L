import mongoose from "mongoose";

const statsSchema = new mongoose.Schema(
  {
      noteCount: { type: Number, default: 0},
      followerCount: { type: Number, default: 0},
      followingCount: { type: Number, default: 0},
  },
  { collection: "stats" }
);

export default statsSchema;
