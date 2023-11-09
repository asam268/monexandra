const express = require("express");
const router = express.Router();
const { getRecipes, createRecipe } = require(
  __dirname + "/./../db/controllers/recipes_controller",
);

// Route to get all recipes
router.get("/", async (req, res) => {
  try {
    // Fetch all recipes from the database
    const recipes = await getRecipes();

    // Send a successful response with the list of recipes
    res.status(200).send({ data: recipes });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);

    // Send an error response with a meaningful error message
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Route to create a new recipe
router.post("/", async (req, res) => {
  try {
    // Extract the required fields from the request body
    const { name, category, instructions, created_by } = req.body;

    // Check if any required fields are missing
    if (!name || !category || !instructions || !created_by) {
      // If so, send a bad request response with an error message
      return res.status(400).send({ error: "Missing required fields" });
    }

    // Insert the new recipe into the database
    const recipe = await createRecipe({
      name,
      category,
      instructions,
      created_by,
    });

    // Send a successful response with the newly created recipe
    res.status(201).send({ data: recipe });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);

    // Send an error response with a meaningful error message
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
