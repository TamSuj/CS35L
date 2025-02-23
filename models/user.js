import mongoose from "mongoose";

// Define the schema for the 'User' collection
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, default: null },
    email: { type: String, required: true, unique: true, default: null },
    name: { type: String, default: null },
    posts: { type: [String], default: [] }, //array of the posts created by this user
    bio: { type: String, default: null },
    profilePic: { type: String, default: null }, //URL of the pfp
    password: { type: String, default: null }, // hashing function (?)
  },
  { collection: "user" }
);

export default userSchema;