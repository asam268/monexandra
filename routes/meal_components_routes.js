const express = require("express");
const router = express.Router();
const options = require(__dirname + "/./../db/knexfile");
const knex = require("knex")(options.development);
const MealComponents = () => knex("meal_components");

router.get("/", async (req, res) => {
  try {
    const meal_components = await MealComponents().select("*");
    res.status(200).send({ data: meal_components });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { meal_id, recipe_id } = req.body;

    if (!meal_id || !recipe_id) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const meal_component = await MealComponents().insert({
      meal_id,
      recipe_id,
    });

    res.status(201).send({ data: meal_component });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;