/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('meal_components').del()
  await knex('meal_components').insert([
    {
      id: 1,
      meal_id: 1,
      recipe_id: 1
    },
    {
      id: 2,
      meal_id: 1,
      recipe_id: 2
    }
  ]);
};
