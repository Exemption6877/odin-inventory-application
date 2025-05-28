const { Pool } = require("pg");

require("dotenv").config({ path: "../.env" });

module.exports = new Pool({
  connectionString: DB_CONNECTION_STRING,
});
