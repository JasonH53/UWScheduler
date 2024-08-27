const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

async function connect() {
  try {
      await client.connect();
      console.log('Connected to MongoDB');
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
  }
}


connectToDatabase();

module.exports = { mongoose };