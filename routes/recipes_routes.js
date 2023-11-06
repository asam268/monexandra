const express = require("express");
const router = express.Router();
const options = require(__dirname + "/./../db/knexfile");
const knex = require("knex")(options.development);
const Recipes = () => knex("recipes");

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipes().select("*");
    res.status(200).send({ data: recipes });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, category, instructions, created_by } = req.body;

    if (!name || !category || !instructions || !created_by) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const recipe = await Recipes().insert({
      name,
      category,
      instructions,
      created_by,
    });

    res.status(201).send({ data: recipe });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
