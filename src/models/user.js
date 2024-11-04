const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 15,
      required: true,
    },
    mail: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password is not strong! Please enter password carefully"
          );
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    about: {
      type: String,
      default: "This is default user bio!",
    },
    photoUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1730193111~exp=1730196711~hmac=ee265823cfdaffd0c2a080b92ebc7d393ac908ec03c531b96ecc0f24bc3ec374&w=740",

      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Profile url is not valid");
        }
      },
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Please select carefully");
        }
      },
    },
    skills: {
      type: [String],
    },
    phone: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error("Phone number is not valid");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
