import express from 'express';
import Tag from "../../models/tag.js";

var router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tagArray = await Tag.find().select("tagName color");
        res.json(tagArray);
    } catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ error: "Failed to fetch tags" });
    }
});

export default router;