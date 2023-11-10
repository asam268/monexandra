const express = require("express");
const router = express.Router();
const { getMealComponents, createMealComponent } = require(
  __dirname + "/./../db/controllers/meal_components_controller",
);

router.get("/", async (req, res) => {
  try {
    const meal_components = await getMealComponents();
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

    const meal_component = await createMealComponent({
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
