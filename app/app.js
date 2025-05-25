const express = require("express");
const path = require("path");

const app = express();

require("dotenv").config({ path: "../.env" });

const PORT = process.env.APP_PORT;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
