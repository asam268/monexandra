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
const Users = () => knex('users')
const Recipes = () => knex('recipes')
const port = process.env.PORT || 5000;

// Log server running and listening to port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/user/:username', (req, res) => {
    console.log('params...')
    console.log(req.params.username)
    Users()
        .select('id', 'username', 'email', 'created_at')
        .where('username', req.params.username)
        .then(data => {
            res.status(200).send({ data });
        }
        )
});

app.get('/recipes', (req, res) => {
    Recipes()
        .then(data => {
            console.log(data)
            res.status(200).send({ data })
        })
});

