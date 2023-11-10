const options = require(__dirname + "/./../knexfile");
const knex = require("knex")(options.development);
const Users = () => knex("users");

const getUser = async ({ username }) => {
  return await Users().where({ username }).first();
};

const createUser = async ({ username, password, email }) => {
  return Users().insert({
    username,
    password,
    email,
    created_at: knex.fn.now(),
  });
};

module.exports = {
  getUser,
  createUser,
};
