const express = require("express");
const router = express.Router();
const options = require(__dirname + "/./../db/knexfile");
const knex = require("knex")(options.development);
const Users = () => knex("users");

router.get("/:username", async (req, res) => {
  try {
    const user = await Users()
      .select("id", "username", "email", "created_at")
      .where("username", req.params.username)
      .first();

    if (user) {
      res.status(200).send({ data: user });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
