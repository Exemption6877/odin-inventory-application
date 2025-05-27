const db = require("../db/queries");

async function getAll(req, res) {
  try {
    const items = await db.getAllInventory();
    res.render("index", { items: items });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getAll };
