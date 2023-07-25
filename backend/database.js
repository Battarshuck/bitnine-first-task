const { Client } = require('pg');

const client = new Client({
    //host: 'localhost', if you are using docker, you should use host.docker.internal instead of localhost
    host: 'host.docker.internal',
    port: 5455,
    user: 'mostafa',
    password: '123',
    database: 'postgresDB'
});

module.exports = client;