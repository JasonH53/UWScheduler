const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    process.exit(1);
  }
};

connectToDatabase();

module.exports = { mongoose };