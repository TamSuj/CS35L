import mongoose from "mongoose";
import statsSchema from "./stats.js";
import tagSchema from "./tag.js";

// Define the schema for the 'User' collection
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, default: null },
    email: { type: String, required: true, unique: true, default: null },
    name: { type: String, default: null },
    posts: { type: [String], default: [] }, //array of the posts created by this user
    bio: { type: String, default: null },
    tags: { type: [tagSchema], default: [] }, //array of user's tag (subject, interest)
    profilePic: { type: String, default: null }, //URL of the pfp
    stats: { type: statsSchema, default: () => ({}) }, //array of the user's stats (follower,  following, note count)
    password: { type: String, default: null }, // hashing function (?)
  },
  { collection: "user" }
);

export default userSchema;