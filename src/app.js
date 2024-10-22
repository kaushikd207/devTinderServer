const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.send("Hello from test routing");
});
app.delete("/hello", (req, res) => {
  res.send("deleted successfully");
});
app.post("/dashboard", (req, res) => {
  res.send("Data has been successfully saved");
});
app.listen(3002, () => {
  console.log("Server is listening at port 3002..");
});
