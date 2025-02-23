import express from "express";
import mongoose from "mongoose";
import userSchema from "../../../models/user.js";

var router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, bio } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const User = mongoose.model("User", userSchema); // arguments: model, schema

    const newUser = new User({
      username: username,
      email: email,
      name: `${firstName} ${lastName}`,
      bio: bio,
      password: password,
    });

    await newUser.save();
    console.log("Test data inserted successfully!");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "uh oh" });
  }
});

export default router;
