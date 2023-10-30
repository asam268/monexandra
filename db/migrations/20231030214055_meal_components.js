/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('meal_components', (table) => {
            table.increments('id').primary().unsigned()
            table.integer('meal_id').unsigned()
            table.foreign('meal_id').references('meals.id')
            table.integer('recipe_id').unsigned()
            table.foreign('recipe_id').references('recipes.id')
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('meal_components');
};
