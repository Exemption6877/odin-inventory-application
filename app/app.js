const express = require("express");
const path = require("path");

const app = express();

require("dotenv").config({ path: "../.env" });

const inventoryRouter = require("./routers/inventoryRouter");

const PORT = process.env.APP_PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes

app.use("/", inventoryRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
