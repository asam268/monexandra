const options = require(__dirname + "/./../knexfile");
const knex = require("knex")(options.development);
const Recipes = () => knex("recipes");

const getRecipes = async () => {
  return await Recipes().select("*");
};

const createRecipe = async ({ name, category, instructions, created_by }) => {
  return await Recipes().insert({
    name,
    category,
    instructions,
    created_by,
  });
};

module.exports = {
  getRecipes,
  createRecipe,
};
