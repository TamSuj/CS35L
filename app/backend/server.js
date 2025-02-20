import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import pkg from '../../models/user.js';
const { User, Post, Comment, Tag, PostTag } = pkg;

dotenv.config({path: '../../.env'}); // load in database and port
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });