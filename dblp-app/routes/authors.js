const express = require('express');
const { MongoClient } = require('mongodb');

const router = express.Router();

// Utilisez votre chaîne de connexion MongoDB ici
const uri = 'mongodb+srv://fatoudoukoure:fatafraise@cluster.yfbnpp4.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

router.get('/', async (req, res) => {
  try {
    // Connect to MongoDB and retrieve data
    await client.connect();
    const database = client.db('dblp_database');
    const collection = database.collection('authors');

    const authors = await collection.find({}).toArray();
    res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching authors');
  } finally {
    await client.close();
  }
});

module.exports = router;
