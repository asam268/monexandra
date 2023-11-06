const options = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "P@ssw0rd",
    database: "mydb",
  },
};

const knex = require("knex")(options);

knex.schema
  .createTable("users", (table) => {
    table.increments("id");
    table.string("username");
    table.string("password");
    table.string("email");
    table.timestamp("created_at");
  })
  .then(() => console.log("table created"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
