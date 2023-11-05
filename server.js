const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'P@ssw0rd',
        database: 'mydb'
    }
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knex = require('knex')(options);
const bcrypt = require('bcrypt');
const Users = () => knex('users');
const Recipes = () => knex('recipes');
const Ingredients = () => knex('ingredients');
const Meals = () => knex('meals');
const MealComponents = () => knex('meals_components');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// Log server running and listening to port
app.listen(port, () => console.log(`Listening on port ${port}`));

// GET Requests
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/user/:username', async (req, res) => {
    try {
        const user = await Users()
            .select('id', 'username', 'email', 'created_at')
            .where('username', req.params.username)
            .first();

        if (user) {
            res.status(200).send({ data: user });
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipes().select('*');
        res.status(200).send({ data: recipes });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('/ingredients', async (req, res) => {
    try {
        const ingredients = await Ingredients().select('*');
        res.status(200).send({ data: ingredients });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('/meals', async (req, res) => {
    try {
        const meals = await Meals().select('*');
        res.status(200).send({ data: meals });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('meal-components', async (req, res) => {
    try {
        const meal_components = await MealComponents().select('*');
        res.status(200).send({ data: meal_components });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// POST requests
app.post('/users', async (req, res) => {
    try {
        const { username, password, email } = req.body

        if (!username || !password || !email) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

        const user_exists = await Users().where({ username }).first()

        if (user_exists) {
            return res.status(400).send({ error: 'Username already exists' });
        }

        const hashpass = await bcrypt.hash(password, 10);

        const user = await Users().insert({
            username,
            password: hashpass,
            email,
            created_at: knex.fn.now()
        });

        res.status(201).send({ data: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post('/recipes', async (req, res) => {
    try {
        const { name, category, instructions, created_by } = req.body;

        if (!name || !category || !instructions || !created_by) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

        const recipe = await Recipes().insert({
            name,
            category,
            instructions,
            created_by
        });

        res.status(201).send({ data: recipe });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post('/ingredients', async (req, res) => {
    try {
        const { name, quantity, unit, recipe_id } = req.body;

        if (!name || !quantity || !unit || !recipe_id) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

        const ingredient = await Ingredients().insert({
            name,
            quantity,
            unit,
            recipe_id
        });

        res.status(201).send({ data: ingredient });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post('/meals', async (req, res) => {
    try {
        const { name } = req.body

        if (!name) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

        const meal = await Meals().insert({
            name
        });

        res.status(201).send({ data: meal })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post('/meal-components', async (req, res) => {
    try {
        const { meal_id, recipe_id } = req.body

        if (!meal_id || !recipe_id) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

        const meal_component = await MealComponents().insert({
            meal_id,
            recipe_id
        });

        res.status(201).send({ data: meal_component });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
