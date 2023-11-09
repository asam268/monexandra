require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

// Database configuration
const options = require("./db/knexfile");
const knex = require("knex")(options.development);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// TODO: Fix root routes
// app.use("/", require("./routes/root_routes"));
app.use("/recipes", require("./routes/recipes_routes"));
app.use("/users", require("./routes/users_routes"));
app.use("/ingredients", require("./routes/ingredients_routes"));
app.use("/meals", require("./routes/meals_routes"));
app.use("/meal-components", require("./routes/meal_components_routes"));

// Log server running and listening to port
app.listen(port, () => console.log(`Listening on port ${port}`));

// app.get("/express_backend", (req, res) => {
//   res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
// });
