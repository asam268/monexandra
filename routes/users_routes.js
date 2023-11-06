

// app.get("/user/:username", async (req, res) => {
//   try {
//     const user = await Users()
//       .select("id", "username", "email", "created_at")
//       .where("username", req.params.username)
//       .first();

//     if (user) {
//       res.status(200).send({ data: user });
//     } else {
//       res.status(404).send({ error: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });

// app.post("/users", async (req, res) => {
//   try {
//     const { username, password, email } = req.body;

//     if (!username || !password || !email) {
//       return res.status(400).send({ error: "Missing required fields" });
//     }

//     const user_exists = await Users().where({ username }).first();

//     if (user_exists) {
//       return res.status(400).send({ error: "Username already exists" });
//     }

//     const hashpass = await bcrypt.hash(password, 10);

//     const user = await Users().insert({
//       username,
//       password: hashpass,
//       email,
//       created_at: knex.fn.now(),
//     });

//     res.status(201).send({ data: user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });
