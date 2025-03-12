import express from 'express';
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import Post from "../../models/post.js";
import User from "../../models/user.js";
import Tag from "../../models/tag.js";

var router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post("/new", upload.single("fileContent"), async (req, res) => {
    try {
        const { textContent, postTitle, userID, tag } = req.body;
        if (tag) {
            //tagArray = tag.split(",");
            //tagArray = Array.isArray(tag) ? tag : [tag];
            let tagArray = JSON.parse(tag);
            console.log("tagArray",tagArray);
            for (const tagName of tagArray) {
                const existingTag = await Tag.findOne({ tagName });
                if (!existingTag) {
                    const newTag = new Tag({ tagName });
                    await newTag.save();
                }
            }
        }

        const newPost = new Post({
            postID: uuidv4(),
            postTitle,
            textContent,
            fileContent: req.file ? req.file.filename : null,
            userID,
            likeCount: 0,
            //comments: [],
            //tags: tags ? tags.split(",") : [],
            tags: tag,
            createdAt: new Date(),
            editedAt: new Date(),
        });

        //console.log("newPost", newPost);

        await newPost.save();
        await User.findByIdAndUpdate(userID, {
            $push: { posts: newPost._id }
        });
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
        const deletedPost = await Post.findOneAndDelete({ _id: postId });
        if (deletedPost) {
            await User.findByIdAndUpdate(deletedPost.userID, {
                $pull: { posts: postId }
            });
            return res.status(200).json({ message: "Post deleted successfully" });
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

router.put('/:postId/edit', upload.single('fileContent'), async (req, res) => {
    const { postId } = req.params;
    const { textContent, postTitle, userID } = req.body;
    try{
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({error: "Post not found"});
        }

        post.textContent = textContent || post.textContent;
        post.postTitle = postTitle || post.postTitle;

        if (req.file) {
            post.fileContent = req.file.filename;
        }

        await post.save();
        res.status(201).json({ message: "Post saved successfully!", post: post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// see if the logged-in user has already liked the post
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

router.put('/:postId/like', async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body; 
    try {
        const post = await Post.findById(postId);
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

export default router;