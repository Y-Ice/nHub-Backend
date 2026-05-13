const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

// Create a new MongoDB client using the connection string from .env file
const client = new mongodb.MongoClient(process.env.MONGODB_URI);

// this helps us connect to the database and handle any requests that come in before the connection is established
const db = client.db(process.env.DB_NAME);

const users = db.collection('users');

// Create all users
router.post('/', async (req, res) => {
    const result = await users.insertOne(req.body);
    res.json({
        message: 'User created successfully',
        userId: result.insertedId
    });
});

module.exports = router;