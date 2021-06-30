// YYYYMMDDHHMMSS_create_movies.js
exports.up = function(knex) {
  return knex.schema.createTable('roster', table => {
    table.increments('id'); // adds an auto incrementing PK column
    table.string('first').notNullable();
    table.string('last');
    table.timestamps(true, true); // adds created_at and updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('roster');
};