import mongoose from "mongoose";
import dotenv from "dotenv";
import Tag from "./models/tag.js"; // Import your Tag model
import path from "path";

//dotenv.config(); // Load environment variables

dotenv.config({ path: path.resolve("../.env") }); 

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("MongoDB connected successfully");

        // Update existing tags without a color field
        const updatedTags = await Tag.updateMany(
            { color: { $exists: false } },
            { $set: { color: "#" + Math.floor(Math.random() * 16777215).toString(16) } }
        );

        console.log(`Updated ${updatedTags.modifiedCount} tags.`);
        process.exit(); // Exit script after updating
    } catch (error) {
        console.error("Error updating tags:", error);
        process.exit(1);
    }
};

// Run the update
connectDB();
