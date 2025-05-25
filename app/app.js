const express = require("express");
const app = express();

require("dotenv").config({ path: "../.env" });

const path = require("node:path");
const PORT = process.env.APP_PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
