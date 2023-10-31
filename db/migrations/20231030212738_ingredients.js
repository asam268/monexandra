/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('ingredients', (table) => {
            table.increments('id').primary().unsigned()
            table.string('name')
            table.float('quantity')
            table.string('unit')
            table.integer('recipe_id').unsigned().nullable()
            table.foreign('recipe_id').references('recipes.id')
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('ingredients');
};
