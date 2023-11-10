const options = require(__dirname + "/./../knexfile");
const knex = require("knex")(options.development);
const Ingredients = () => knex("ingredients");

const getIngredients = async () => {
  return await Ingredients().select("*");
};

const createIngredient = async ({ name, quantity, unit, recipe_id }) => {
  return await Ingredients().insert({
    name,
    quantity,
    unit,
    recipe_id,
  });
};

module.exports = {
  getIngredients,
  createIngredient,
};
