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

async function getNewCategory(req, res) {
  try {
    const categories = await db.getAllCategories();
    res.render("newcategory", { categories: categories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function postNewCategory(req, res) {
  try {
    const category = req.body.text;
    await db.insertNewCategory(category);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function postDeleteCategory(req, res) {
  try {
    const category = req.body.select;
    await db.deleteCategory(category);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAll,
  getNewCategory,
  postNewCategory,
  postDeleteCategory,
};
