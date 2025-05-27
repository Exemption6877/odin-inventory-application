const { Router } = require("express");

const inventoryController = require("../controllers/inventoryController");
const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.getAll);

inventoryRouter.get("/newcategory", inventoryController.getNewCategory);

module.exports = inventoryRouter;
