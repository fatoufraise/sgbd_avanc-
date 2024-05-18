const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');

const router = express.Router();

// Utilisez votre chaîne de connexion MongoDB ici
const uri = 'mongodb+srv://fatoudoukoure:fatafraise@cluster.yfbnpp4.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

router.get('/', async (req, res) => {
  try {
    // Fetch data from DBLP API
    const response = await axios.get('https://dblp.org/search/author/api?q=your_search_term&format=json');
    const authors = response.data.result.hits.hit.map(hit => hit.info);

    // Connect to MongoDB and insert data
    await client.connect();
    const database = client.db('dblp_database');
    const collection = database.collection('authors');

    const result = await collection.insertMany(authors);
    res.status(200).send(`${result.insertedCount} authors inserted.`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching or inserting authors');
  } finally {
    await client.close();
  }
});

module.exports = router;
