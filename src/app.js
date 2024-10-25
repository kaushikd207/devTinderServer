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
