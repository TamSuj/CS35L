import express from "express";
import mongoose from "mongoose";
// import userSchema from "../../../models/user.js";  // Import the user schema
import User from "../../models/user.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // const User = mongoose.models.User || mongoose.model('User', userSchema);
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            id: user._id,
            email: user.email,
            name: user.name,
            bio: user.bio,
            posts: user.posts,
            profilePic: user.profilePic,
            tags: user.tags,
            stats: user.stats,
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
