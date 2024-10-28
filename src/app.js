const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());
app.post("/signUp", async (req, res) => {
  const userData = req.body;
  const user = new User(userData);
  try {
    await user.save();
    res.send(" User added successfully");
  } catch (err) {
    res.status(400).send("User can not be added " + err.message);
  }
});

app.get("/userByMail", async (req, res) => {
  try {
    const userList = await User.find({ mail: "kaushikd207@gmail.com" });
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
