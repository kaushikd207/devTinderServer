const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mail: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
});

module.exports = mongoose.model("User", userSchema);