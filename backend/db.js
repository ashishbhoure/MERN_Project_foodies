const mongoose = require("mongoose");
// const { collection } = require("./models/User");
const dbURL = "mongodb://127.0.0.1:27017/food-app-db";

const mongoDB = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected -----");

    // fectching data fron "foodData" collection
    const foodData = await mongoose.connection.db.collection("foodData");
    const foodItems = await foodData.find({}).toArray();
    global.foodItems = foodItems;

    // fectching data fron "foodCategory" collection
    const foodCategory = await mongoose.connection.db.collection(
      "foodCategory"
    );
    const categoryData = await foodCategory.find({}).toArray();
    global.foodCategory = categoryData;
    // console.log(global.foodCategory);
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoDB;
