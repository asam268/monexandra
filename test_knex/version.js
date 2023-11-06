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

knex
  .raw("SELECT VERSION()")
  .then((version) => console.log(version[0][0]))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
