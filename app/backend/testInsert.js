// Test script to insert test data into MongoDB
// use as refernece to write create functions to add to collections
import mongoose from "mongoose";
import userSchema from "../../models/user.js";
import db from "./config/db.js"; // ensure path is correct

const insertTestData = async () => {
  // WORKS !!!
  try {
    // MUST INITIALIZE MODEL AFTER CONNECTION IS 100% ESTABLISHED
    // Create the model in a separate file where the connection is established
    const User = mongoose.model("User", userSchema); // arguments: model, schema

    const newUser = new User({
      username: "testUser2",
      email: "testEmail@gmail.com",
      name: "testName",
      bio: "testBio",
      password: "test",
    });

    await newUser.save();
    console.log("Test data inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting test:", error);
  }
};

db.once("open", async () => {
  console.log("Connected to MongoDB");
  await insertTestData();
});

// [OBSOLETE]
// this is super goofy because we have to wait for the
// connection to be established before we can import the models
// Error I get otherwise: 'MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms'
// db.once('open', async () => {
//     console.log('Connected to MongoDB');

//     const User = await import('../../models/user.js');
//     const Post = await import('../../models/post.js');
//     const Comment = await import('../../models/comment.js');
//     const Tag = await import('../../models/tag.js');
//     const PostTag = await import('../../models/postTag.js');
// });

// const newUser = new User({
//     username: "testUser",
//     name: "testName",
//     bio: "testBio",
//     password: "test" });

// try {
//     await newUser.save();
//     console.log("User saved successfully!");
// } catch (err) {
//     console.error(`Error saving user: ${err}`);
// }
