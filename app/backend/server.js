import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import register from "./routes/register.js";
import login from "./routes/login.js";
import post from "./routes/post.js";
import search from "./routes/search.js";

dotenv.config({ path: "../../.env" }); // load in database and port
const app = express();
const port = process.env.PORT || 3001;

// Establish MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
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
});

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/post", post);
app.use("/api/search", search);
app.use("/uploads", express.static("uploads"));
