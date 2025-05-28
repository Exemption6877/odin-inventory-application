const { Router } = require("express");

const inventoryController = require("../controllers/inventoryController");
const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.getAll);

// Category
inventoryRouter.get("/newcategory", inventoryController.getNewCategory);
inventoryRouter.post("/newcategories", inventoryController.postNewCategory);
inventoryRouter.post(
  "/deletecategories",
  inventoryController.postDeleteCategory
);
inventoryRouter.post("/editcategories", inventoryController.postEditCategory);

// Platforms
inventoryRouter.get("/newplatform", inventoryController.getNewPlatform);
inventoryRouter.post("/newplatforms", inventoryController.postNewPlatform);
inventoryRouter.post(
  "/deleteplatforms",
  inventoryController.postDeletePlatform
);
inventoryRouter.post("/editplatforms", inventoryController.postEditPlatform);

// Developers
inventoryRouter.get("/newdeveloper", inventoryController.getNewDeveloper);
inventoryRouter.post("/newdevelopers", inventoryController.postNewDeveloper);
inventoryRouter.post(
  "/deletedevelopers",
  inventoryController.postDeleteDeveloper
);
inventoryRouter.post("/editdevelopers", inventoryController.postEditDeveloper);

// Iventory
inventoryRouter.get("/newentry", inventoryController.getNewEntry);
inventoryRouter.post("/newentry", inventoryController.postNewEntry);

// Existing entries
inventoryRouter.get("/edit/:id", inventoryController.getEditEntry);
inventoryRouter.post("/edit/:id", inventoryController.postEditEntry);
inventoryRouter.post("/delete/:id", inventoryController.postDeleteEntry);

module.exports = inventoryRouter;
