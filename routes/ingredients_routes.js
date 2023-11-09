const express = require("express");
const { getIngredients } = require("../db/controllers/ingredients_controller");
const router = express.Router();
const { getIngredients, createIngredient } = require(
  __dirname + "/./../db/controllers/ingredients_controller",
);

router.get("/", async (req, res) => {
  try {
    const ingredients = await getIngredients();
    res.status(200).send({ data: ingredients });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, quantity, unit, recipe_id } = req.body;

    if (!name || !quantity || !unit || !recipe_id) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const ingredient = await createIngredient({
      name,
      quantity,
      unit,
      recipe_id,
    });

    res.status(201).send({ data: ingredient });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
