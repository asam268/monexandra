const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { getUser, createUser } = require(
  __dirname + "/./../db/controllers/users_controller",
);

// Route to create a new user
router.post("/", async (req, res) => {
  try {
    // Extract the required fields from the request body
    const { username, password, email } = req.body;

    // Check if any required fields are missing
    if (!username || !password || !email) {
      // If so, send a bad request response with an error message
      return res.status(400).send({ error: "Missing required fields" });
    }

    // Check if a user with the same username already exists
    const userExists = await getUser({ username });

    if (userExists) {
      // If so, send a bad request response with an error message
      return res.status(400).send({ error: "Username already exists" });
    }

    // Hash the password before storing it (assuming bcrypt is imported)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const user = await createUser({
      username,
      password: hashedPassword,
      email,
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
