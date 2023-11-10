const options = require(__dirname + "/./../knexfile");
const knex = require("knex")(options.development);
const Meals = () => knex("meals");

const getMeals = async () => {
  return await Meals().select("*");
};

const createMeal = async ({ name }) => {
  return await Meals().insert({
    name,
  });
};

module.exports = {
  getMeals,
  createMeal,
};
