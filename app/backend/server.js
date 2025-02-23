import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userSchema from "../../models/user.js";
import db from "./config/db.js";

dotenv.config({ path: "../../.env" }); // load in database and port
const app = express();
const port = process.env.PORT || 3001;

// Establish MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

// Connect to database before starting server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Backend Server is running on http://localhost:${port}`);
  });
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend server is running");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!" });
  console.log("hello");
});

app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // MUST INITIALIZE MODEL AFTER CONNECTION IS 100% ESTABLISHED
    // Create the model in a separate file where the connection is established
    const User = mongoose.model("User", userSchema); // arguments: model, schema

    const newUser = new User({
      username: username,
      email: email,
      name: firstName,
      bio: lastName,
      password: password,
    });

    await newUser.save();
    console.log("Test data inserted successfully!");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
