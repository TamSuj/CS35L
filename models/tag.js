const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    tagName: { type: String, default: null }
});

module.exports = tagSchema;