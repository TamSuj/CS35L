import express from "express";
import mongoose from "mongoose";

// Search users, posts, and tags
import User from "../../models/user.js";
import Post from "../../models/post.js";
import Tag from "../../models/tag.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { query } = req.body;

    try {
        const userResults = await User.find({
            username: { $regex: query, $options: "i" }
        });

        if (userResults.length === 0) { // or use userResults.length === 0
            console.log("NO USER FOUND");
            return res.json({ results: userResults });
        }

        res.json({ results: userResults });
    } catch (error) {
        console.error("Search error: ", error);
        return res.status(500).json({ error: "Search failed" });
    }
});

export default router;