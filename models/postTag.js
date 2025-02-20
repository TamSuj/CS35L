const mongoose = require('mongoose');

const postTagSchema = new mongoose.Schema({
    postId: { type: String, required: true, default: null },
    tagName: { type: String, default: null }
});

const PostTag = mongoose.model('PostTag', postTagSchema);

module.exports = PostTag;