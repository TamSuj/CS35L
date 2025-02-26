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

export default router;

