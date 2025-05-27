const db = require("../db/queries");

async function getAll(req, res) {
  try {
    const items = await db.getAllInventory();
    const categories = await db.getAllCategories();

    res.render("index", { items: items, categories: categories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getAll };
