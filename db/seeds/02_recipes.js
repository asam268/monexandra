/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("recipes").del();
  await knex("recipes").insert([
    {
      id: 1,
      name: "first recipe",
      category: "entrees",
      instructions: "make it tasty",
      created_by: 1,
    },
    {
      id: 2,
      name: "second recipe",
      category: "entrees",
      instructions: "make it even tastier",
      created_by: 2,
    },
  ]);
};
