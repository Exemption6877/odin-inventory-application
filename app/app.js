const express = require("express");
const app = express();

require("dotenv").config({ path: "../.env" });

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
