/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('meals').del()
  await knex('meals').insert([
    {
      id: 1,
      name: 'the combo'
    }
  ]);
};
