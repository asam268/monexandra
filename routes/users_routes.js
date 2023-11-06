const express = require("express");
const router = express.Router();
const options = require(__dirname + "/./../db/knexfile");
const knex = require("knex")(options.development);
const Users = () => knex("users");

// Route to create a new user
router.post("/users", async (req, res) => {
  try {
    // Extract the required fields from the request body
    const { username, password, email } = req.body;

    // Check if any required fields are missing
    if (!username || !password || !email) {
      // If so, send a bad request response with an error message
      return res.status(400).send({ error: "Missing required fields" });
    }

    // Check if a user with the same username already exists
    const userExists = await Users().where({ username }).first();

    if (userExists) {
      // If so, send a bad request response with an error message
      return res.status(400).send({ error: "Username already exists" });
    }

    // Hash the password before storing it (assuming bcrypt is imported)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const user = await Users().insert({
      username,
      password: hashedPassword,
      email,
      created_at: knex.fn.now(),
    });

    // Send a successful response with the newly created user
    res.status(201).send({ data: user });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);

    // Send an error response with a meaningful error message
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
