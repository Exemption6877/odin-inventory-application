const { Router } = require("express");

const inventoryRouter = Router();

inventoryRouter.get("/", (req, res) => res.render("index"));

module.exports = inventoryRouter;
