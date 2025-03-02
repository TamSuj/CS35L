import express from "express";
import User from "../../models/user.js";
import Post from "../../models/post.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { query } = req.body;

    try {
        const userResults = await User.find({
            username: { $regex: query, $options: "i" }
        });

        const postResults = await Post.find({
            $or: [
                { postTitle: { $regex: query, $options: "i" }},
                { textContent: { $regex: query, $options: "i" }},
                { postTags: { $regex: query, $options: "i" }}
            ]
            
        });

        const searchResults = [userResults, postResults];
        res.json({ results: searchResults });
    } catch (error) {
        console.error("Search error: ", error);
        return res.status(500).json({ error: "Search failed" });
    }
});

export default router;