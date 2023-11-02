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
const knex = require('knex')(options);
const Users = () => knex('users');
const Recipes = () => knex('recipes');
const Ingredients = () => knex('ingredients');
const Meals = () => knex('meals');
const MealComponents = () => knex('meals_components');
const port = process.env.PORT || 5000;

// Log server running and listening to port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
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
