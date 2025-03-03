import express from 'express';
import Post from '../models/Post'; // Adjust the path based on your file structure
const router = express.Router();

// Like a post (POST /:postId/like)
router.post("http://localhost:3000/api/post/:postId/like", async (req, res) => {
    try {
        const { postId } = req.params;
        const { userID } = req.body;

        // Find the post by its postID
        const post = await Post.findOne({ postID: postId });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if the user already liked the post
        if (post.likedBy.includes(userID)) {
            return res.status(400).json({ error: "You have already liked this post" });
        }

        // Add the user to the likedBy array and increment the like count
        post.likedBy.push(userID);
        post.likeCount += 1;

        // Save the post with updated likeCount and likedBy
        await post.save();

        res.status(200).json({
            message: "Post liked successfully",
            post, // Send the updated post back with the new likeCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Unlike a post (DELETE /:postId/like)
router.delete("http://localhost:3000/api/post/:postId/like", async (req, res) => {
    try {
        const { postId } = req.params;
        const { userID } = req.body; // Assuming you are passing the userID in the request body

        // Find the post by its postID
        const post = await Post.findOne({ postID: postId });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if the user has liked the post
        if (!post.likedBy.includes(userID)) {
            return res.status(400).json({ error: "You have not liked this post" });
        }

        // Remove the user from the likedBy array and decrement the like count
        post.likedBy = post.likedBy.filter(user => user !== userID);
        post.likeCount -= 1;

        // Save the post with updated likeCount and likedBy
        await post.save();

        res.status(200).json({
            message: "Post unliked successfully",
            post, // Send the updated post back with the new likeCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
