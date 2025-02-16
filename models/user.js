// Schemas are defined here 

// const mongoose = require('mongoose'); //not sure if this is needed here since it is already in app.js

// Define the schema for the 'User' collection
const postSchema = new mongoose.Schema({
    postID: { type: String, required: true, unique: true, default: () => require('uuid').v4() }, //UUID
    textContent: { type: String, default: null },
    fileContent: { type: String, required: false, default: null }, //optional
    username: { type: String, default: null }, //UUID of the user posting it
    likeCount: { type: Number, default: 0},
    comments: { type: [Number], default: []}, //array of comments to the post
    createdAt: { type: Date, default: Date.now },
    editedAt: { type: Date, default: Date.now }, 
    tags: { type: [String], default: [] }
  }, {timestamps: true}); //automatically handles timestamps

const commentSchema = new mongoose.Schema({
    commentID: { type: String, required: true, unique: true, default: null}, //UUID
    username: { type: String, default: null }, //UUID of the user posting the comment
    content: {type: String, default: null },
    createdAt: { type: Date, default: Date.now},
}, { timestamps: true });

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, default: null },
    name: { type: String, default: null },
    posts: { type: [String], default: [] }, //array of the posts created by this user
    bio: { type: String, default: null},
    profilePic: { type: String, default: null }, //URL of the pfp
    password: { type: String, default: null } // hashing function (?)
});

const tagSchema = new mongoose.Schema({
    tagName: { type: String, default: null }
});

const postTag = new mongoose.Schema({
    postId: { type: String, required: true, default: null },
    tagName: { type: String, default: null}
}); 


// Create the models
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Tag = mongoose.model('Tag', tagSchema);
const PostTag = mongoose.model('PostTag', postTagSchema);

module.exports = { User, Post, Comment, Tag, PostTag };
