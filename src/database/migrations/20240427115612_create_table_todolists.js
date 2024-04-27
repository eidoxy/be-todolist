/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('todolists', (table) => {
    table.bigIncrements('id').primary();
    table.bigInteger('user_id').unsigned().references('id').inTable('users');
    table.string('title').nullable();
    table.text('description').nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('todolists');
};
