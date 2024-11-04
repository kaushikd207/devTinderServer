const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signUp", async (req, res) => {
  const { firstName, lastName, mail, password, gender, phone } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    mail,
    password: hashPassword,
    gender,
    phone,
  });

  try {
    await user.save();
    res.send(" User added successfully");
  } catch (err) {
    res.status(400).send("User can not be added " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail: mail });
    if (!user) {
      res.send("Please check your mail");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      res.send("Login Successfully!!");
    } else {
      res.send("Invalid Password!!");
    }
  } catch (err) {
    res.status(400).send("User not Found " + err.message);
  }
});

app.post("/userByMail", async (req, res) => {
  const { mail } = req.body;
  try {
    const userList = await User.findOne({ mail: mail });
    res.send(userList);
  } catch (err) {
    res.send(" user Not found");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const userList = await User.find({});
    res.send(userList);
  } catch (err) {
    res.send("Not found any user");
  }
});

app.delete("/deleteUser", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.send("User does not exist/can not delete");
  }
});

app.patch("/update/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_FIELDS = [
      "firstName",
      "lastName",
      "password",
      "about",
      "photoUrl",
      "skills",
    ];
    const isAllowedField = Object.keys(data).every((k) =>
      ALLOWED_FIELDS.includes(k)
    );
    if (!isAllowedField) {
      res.send("Please check your fields");
    }
    if (data?.skills.length > 10) {
      res.send("Only max 10 skills are allowed");
    }
    console.log("Email", userId);
    console.log("Data", data);
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidator: true,
    });
    res.send("Data updated successfully");
  } catch (err) {
    res.send("can not update:", +err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(3002, () => {
      console.log("Server is listening at port 3002..");
    });
  })
  .catch((err) => {
    console.log("Database connection failed!");
  });
