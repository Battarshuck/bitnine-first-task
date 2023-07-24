const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5455,
    user: 'mostafa',
    password: '123',
    database: 'postgresDB'
});

module.exports = client;