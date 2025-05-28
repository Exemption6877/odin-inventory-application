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

//New Inventory
async function postNewEntry(req, res) {
  try {
    const title = req.body.title || null;
    const date = req.body.date || null;
    const developer = req.body.developer ? Number(req.body.developer) : null;
    const coverUrl = req.body.imageurl || null;
    const platform = req.body.platform ? Number(req.body.platform) : null;
    const category1 = req.body.categories1
      ? Number(req.body.categories1)
      : null;
    const category2 = req.body.categories2
      ? Number(req.body.categories2)
      : null;

    const price = req.body.price ? Number(req.body.price) : null;
    const discount = req.body.discount ? Number(req.body.discount) : null;
    const availability = req.body.available || null;

    await db.insertNewGame(
      title,
      date,
      developer,
      coverUrl,
      platform,
      category1,
      category2,
      price,
      discount,
      availability
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function getEditEntry(req, res) {
  try {
    const entryId = req.params.id;
    const item = await db.getItemById(entryId);
    const developers = await db.getAllDevelopers();
    const platforms = await db.getAllPlatforms();
    const categories = await db.getAllCategories();
    console.log(item);

    res.render("newentry", {
      title: "New Entry",
      developers: developers,
      platforms: platforms,
      categories: categories,
      editedEntry: item[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function postEditEntry(req, res) {
  try {
    const entryId = req.params.id;
    const title = req.body.title || null;
    const date = req.body.date || null;
    const developer = req.body.developer ? Number(req.body.developer) : null;
    const coverUrl = req.body.imageurl || null;
    const platform = req.body.platform ? Number(req.body.platform) : null;
    const category1 = req.body.categories1
      ? Number(req.body.categories1)
      : null;
    const category2 = req.body.categories2
      ? Number(req.body.categories2)
      : null;

    const price = req.body.price ? Number(req.body.price) : null;
    const discount = req.body.discount ? Number(req.body.discount) : null;
    const availability = req.body.available || null;

    await db.updateEntry(
      platform,
      price,
      discount,
      availability,
      entryId,
      title,
      date,
      developer,
      coverUrl,
      category1,
      category2
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function postDeleteEntry(req, res) {
  try {
    const entryId = req.params.id;
    await db.deleteEntry(entryId);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function getSortByCategory(req, res) {
  try {
    const category = req.params.category;
    const items = await db.sortByCategory(category);
    const categories = await db.getAllCategories();

    res.render("index", { items: items, categories: categories });
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
  postNewEntry,
  getEditEntry,
  postEditEntry,
  postDeleteEntry,
  getSortByCategory,
};
