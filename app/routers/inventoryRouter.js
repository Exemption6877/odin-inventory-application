const { Router } = require("express");
const { getAllInventory } = require("../db/queries");

const inventoryRouter = Router();

inventoryRouter.get("/", (req, res) => {
  getAllInventory();
  res.render("index");
});

module.exports = inventoryRouter;
