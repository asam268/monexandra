const options = require(__dirname + "/./../knexfile");
const knex = require("knex")(options.development);
const MealComponents = () => knex("meal_components");

const getMealComponents = async () => {
  return await MealComponents().select("*");
};

const createMealComponent = async ({ meal_id, recipe_id }) => {
  return await MealComponents().insert({
    meal_id,
    recipe_id,
  });
};

module.exports = {
  getMealComponents,
  createMealComponent,
};
