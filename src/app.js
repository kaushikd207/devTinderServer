const express = require("express");

const app = express();

app.use(
  "/user",
  [
    (req, res, next) => {
      console.log("user path");
      next();
    },
    (req, res, next) => {
      next();
      res.send("1 router");
    },
  ],
  (req, res, next) => {
    res.send("2 router");
  }
);
app.listen(3002, () => {
  console.log("Server is listening at port 3002..");
});
