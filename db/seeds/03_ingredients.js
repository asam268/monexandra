/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("ingredients").del();
  await knex("ingredients").insert([
    {
      id: 1,
      name: "sugar",
      quantity: 1,
      unit: "spoonful",
      recipe_id: 1,
    },
    {
      id: 2,
      name: "salt",
      quantity: 1,
      unit: "tablespoon",
      recipe_id: 2,
    },
    {
      id: 3,
      name: "spice",
      quantity: 1,
      unit: "hunk",
      recipe_id: 2,
    },
    {
      id: 4,
      name: "everything nice",
      quantity: 3.14,
      unit: "theoretical",
      recipe_id: 2,
    },
  ]);
};
