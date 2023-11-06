/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex, Promise) {
  return knex.schema.createTable("recipes", (table) => {
    table.increments("id").primary().unsigned();
    table.string("name");
    table.string("category");
    table.text("instructions");
    table.integer("created_by").unsigned().nullable();
    table.foreign("created_by").references("users.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex, Promise) {
  return knex.schema.dropTable("recipes");
};
