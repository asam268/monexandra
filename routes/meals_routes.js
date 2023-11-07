const express = require("express");
const router = express.Router();
const options = require(__dirname + "/./../db/knexfile");
const knex = require("knex")(options.development);
const Meals = () => knex("meals");

router.get("/", async (req, res) => {
  try {
    const meals = await Meals().select("*");
    res.status(200).send({ data: meals });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const meal = await Meals().insert({
      name,
    });

    res.status(201).send({ data: meal });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
