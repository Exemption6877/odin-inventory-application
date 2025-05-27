const { Router } = require("express");

const inventoryController = require("../controllers/inventoryController");
const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.getAll);

inventoryRouter.get("/newcategory", inventoryController.getNewCategory);
inventoryRouter.post("/newcategory", inventoryController.postNewCategory);
inventoryRouter.post("/deletecategory", inventoryController.postDeleteCategory);

module.exports = inventoryRouter;
