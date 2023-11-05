/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id').primary().unsigned()
            table.string('username').notNullable().unique()
            table.string('password').notNullable()
            table.string('email').notNullable()
            table.timestamp('created_at').nullable()
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable('users');
};
