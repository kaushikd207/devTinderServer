const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kaushikd207:test123@devtinder.8a79v.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
