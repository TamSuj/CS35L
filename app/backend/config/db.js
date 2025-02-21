import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" }); // Load database and port

mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

export default db;
