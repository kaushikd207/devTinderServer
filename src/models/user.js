const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  about: {
    type: String,
    default: "This is default user bio!",
  },
  photoUrl: {
    type: String,
    default:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1730193111~exp=1730196711~hmac=ee265823cfdaffd0c2a080b92ebc7d393ac908ec03c531b96ecc0f24bc3ec374&w=740",
  },
  gender: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
