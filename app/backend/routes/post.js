import express from 'express';
import Post from "../../models/post.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

var router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post("/new", upload.single("fileContent"), async (req, res) => {
    try {
        const { textContent, postTitle, userID } = req.body;

        const newPost = new Post({
            postID: uuidv4(),
            postTitle,
            textContent,
            fileContent: req.file ? req.file.filename : null,
            userID,
            likeCount: 0,
            //comments: [],
            //tags: tags ? tags.split(",") : [],
            createdAt: new Date(),
            editedAt: new Date(),
        });

        await newPost.save();
        res.status(201).json({ message: "Post saved successfully!", post: newPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.put('/:id/like', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body; 
    
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const alreadyLiked = post.likedBy.includes(userId);
        if (alreadyLiked) {
            post.likedBy.pull(userId);
            post.likeCount -= 1;
        } else {
            post.likedBy.push(userId);
            post.likeCount += 1;
        }

        const updatedPost = await post.save();
        res.status(200).json({ 
            likeCount: updatedPost.likeCount, 
            likedBy: updatedPost.likedBy 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/all", async (req, res) => {
    try {
        const posts = await Post.find().populate("userID", "username");
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

router.get("/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate("userID", "username");
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Failed to fetch post" });
    }
});

// see if the logged-in user has liked the post
router.get('/:postId/liked', async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.query;  
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const liked = post.likedBy.includes(userId); 
        res.json({
            liked,
            likeCount: post.likeCount, 
        });
    } catch (error) {
        console.error("Error fetching liked state:", error);
        res.status(500).json({ error: 'Failed to fetch liked state' });
    }
});


export default router;

