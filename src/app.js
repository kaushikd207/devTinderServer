const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//   res.send("Hello from Dashboard");
// });
app.use("/test", (req, res) => {
  res.send("Hello from test routing");
});
app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello!");
});
app.listen(3002, () => {
  console.log("Server is listening at port 3002..");
});
