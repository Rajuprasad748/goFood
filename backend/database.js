const mongoose = require("mongoose");

const mongodbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mernapp");
    console.log("Connected to MongoDB");

    const collection = mongoose.connection.db.collection("foodItems");
    const data = await collection.find({}).toArray();

    console.log("data:");

    const foodCategory = mongoose.connection.db.collection("foodcategory");
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
