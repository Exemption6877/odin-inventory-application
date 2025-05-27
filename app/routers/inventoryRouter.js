const { Router } = require("express");

const inventoryController = require("../controllers/inventoryController");
const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.getAll);

inventoryRouter.get("/newcategory", inventoryController.getNewCategory);
inventoryRouter.post("/newcategories", inventoryController.postNewCategory);
inventoryRouter.post(
  "/deletecategories",
  inventoryController.postDeleteCategory
);
inventoryRouter.post("/editcategories", inventoryController.postEditCategory);

inventoryRouter.get("/newplatform", inventoryController.getNewPlatform);
inventoryRouter.post("/newplatforms", inventoryController.postNewPlatform);
inventoryRouter.post(
  "/deleteplatforms",
  inventoryController.postDeletePlatform
);
inventoryRouter.post("/editplatforms", inventoryController.postEditPlatform);

inventoryRouter.get("/newdeveloper", inventoryController.getNewDeveloper);
inventoryRouter.post("/newdevelopers", inventoryController.postNewDeveloper);
inventoryRouter.post(
  "/deletedevelopers",
  inventoryController.postDeleteDeveloper
);
inventoryRouter.post("/editdevelopers", inventoryController.postEditDeveloper);

inventoryRouter.get("/newentry", inventoryController.getNewEntry);

module.exports = inventoryRouter;
