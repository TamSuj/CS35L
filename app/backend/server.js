import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";

dotenv.config({ path: "../../.env" }); // load in database and port
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend server is running");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!" });
  console.log("hello");
});

app.post("/api/register", (req, res) => {
  res.send("POST Request Called");
});

app.listen(port, () => {
  console.log(`Backend Server is running on http://localhost:${port}`);
});
