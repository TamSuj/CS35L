import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import { User, Post, Comment, Tag, PostTag } from './user.js';

dotenv.config(); // load in database and port
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, { // TO DO: link to remote database
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });