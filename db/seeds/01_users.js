/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      username: "asa",
      password: "password",
      email: "asam268@gmail.com",
      created_at: knex.fn.now(),
    },
    {
      id: 2,
      username: "megan",
      password: "password",
      email: "meg.litts@gmail.com",
      created_at: knex.fn.now(),
    },
  ]);
};
