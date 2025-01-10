const mongoose = require("mongoose");
require("dotenv").config();

const mongodbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    const collection = await mongoose.connection.collection("foodItems");
    const data = await collection.find({}).toArray();
    

    const foodCategory = await mongoose.connection.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();
    

    if (catData) {
      global.foodItems = data;
      global.foodCategory = catData;
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongodbConnection;