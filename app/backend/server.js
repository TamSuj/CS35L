import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
//import User from '../../models/user.js';

dotenv.config({path: '../../.env'}); // load in database and port
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Placeholder');
});
  
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});