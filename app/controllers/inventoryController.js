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
    res.render("newcategory", {
      title: "Categories",
      categories: categories,
    });
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

async function postEditCategory(req, res) {
  try {
    const selectedCategory = req.body.toedit;
    const toResult = req.body.edit;

    await db.editCategory(toResult, selectedCategory);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function getNewEntry(req, res) {
  try {
    const developers = await db.getAllDevelopers();
    const platforms = await db.getAllPlatforms();
    const categories = await db.getAllCategories();

    res.render("newentry", {
      title: "New Entry",
      developers: developers,
      platforms: platforms,
      categories: categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function getNewPlatform(req, res) {
  try {
    const platforms = await db.getAllPlatforms();
    res.render("newcategory", {
      title: "Platforms",
      categories: platforms,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function postNewPlatform(req, res) {
  try {
    const platform = req.body.text;
    await db.insertNewPlatform(platform);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function postDeletePlatform(req, res) {
  try {
    const platform = req.body.select;
    await db.deletePlatform(platform);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function postEditPlatform(req, res) {
  try {
    const selectedPlatform = req.body.toedit;
    const toResult = req.body.edit;

    await db.editPlatform(toResult, selectedPlatform);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

// developers

async function getNewDeveloper(req, res) {
  try {
    const developers = await db.getAllDevelopers();
    res.render("newcategory", {
      title: "Developers",
      categories: developers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function postNewDeveloper(req, res) {
  try {
    const developer = req.body.text;
    await db.insertNewDeveloper(developer);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function postDeleteDeveloper(req, res) {
  try {
    const developer = req.body.select;
    await db.deleteDeveloper(developer);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function postEditDeveloper(req, res) {
  try {
    const selectedDeveloper = req.body.toedit;
    const toResult = req.body.edit;

    await db.editDeveloper(toResult, selectedDeveloper);
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
  postEditCategory,
  getNewEntry,
  getNewPlatform,
  postNewPlatform,
  postDeletePlatform,
  postEditPlatform,
  getNewDeveloper,
  postNewDeveloper,
  postDeleteDeveloper,
  postEditDeveloper,
};
