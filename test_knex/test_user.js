const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'P@ssw0rd',
        database: 'mydb'
    }
};

const knex = require('knex')(options);

// var some = knex.select('username')
//     .from('users')
const Users = () => knex('users')

Users().then(data => console.log(data))

console.log()
