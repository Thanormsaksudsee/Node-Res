require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT||3000;

app.get("/", (req, res) => {
  res.send("Hello BIGKUMA");
});

app.listen(port, () => {
  console.log(`Example app listenning at http://localhost:${port}`);
});