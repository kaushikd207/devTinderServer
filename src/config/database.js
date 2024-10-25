const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kaushikd207:test123@devtinder.8a79v.mongodb.net/?retryWrites=true&w=majority&appName=devTinder/devTinder"
  );
};

module.exports = connectDB;
