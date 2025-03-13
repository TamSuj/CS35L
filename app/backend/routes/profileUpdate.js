import express from "express";
import User from "../../models/user.js";

const router = express.Router();

// Update user profile
router.put("/", async (req, res) => {
  try {
    const { name, bio, tags, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          name: name,
          bio: bio,
          tags: tags, // [ { tagName: 'tag1' }, { tagName: 'tag2' } ]
        },
        { new: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Profile update failed" });
  }
});

export default router;
