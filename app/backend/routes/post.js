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

router.delete("/:postId", async (req, res) => {
    const { postId } = req.params;
    try {
        const deleted = await Post.findOneAndDelete({_id: postId});
        if(deleted){
            return res.status(200).json({message: "Post deleted successfully"});
        } else {
            return res.status(404).json({ error: "Post not found"});
        }
    } catch (error) {
        console.error("Error deleting post", error);
        res.status(500).json({ error: "Failed to delete post" });
    }

});

router.get('/:postId/isPoster', async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.query;
    //console.log("Received userId: ", userId);
    try{
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({ message: 'Post not found' });
        }
        
        const poster = post.userID.toString();
        //console.log("Post owner ID: ", poster);
        if(poster === userId)
        {
            return res.status(200).json({ isPoster: true });
        } else {
            return res.status(200).json({ isPoster: false });
        } 
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal server error', error});
    }
});


export default router;

