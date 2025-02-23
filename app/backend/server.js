import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userSchema from "../../models/user.js";
import "../routes";

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

app.use("/api/register", register);
