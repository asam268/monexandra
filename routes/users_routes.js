const express = require("express");
const router = express.Router();
const options = require(__dirname + "/./../db/knexfile");
const knex = require("knex")(options.development);
const Users = () => knex("users");

router.post("/users", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const user_exists = await Users().where({ username }).first();

    if (user_exists) {
      return res.status(400).send({ error: "Username already exists" });
    }

    const hashpass = await bcrypt.hash(password, 10);

    const user = await Users().insert({
      username,
      password: hashpass,
      email,
      created_at: knex.fn.now(),
    });

    res.status(201).send({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
