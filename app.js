const mongoose = require('mongoose');
const { User, Post, Comment, Tag, PostTag } = require('./user');

mongoose.connect('mongodb://localhost:27017/studygram', { //insert where the database is located
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });
