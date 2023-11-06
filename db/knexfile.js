// Update with your config settings.
const path = require("path");

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "P@ssw0rd",
      database: "mydb",
    },
    migrations: {},
    useNullAsDefault: true,
  },
};
