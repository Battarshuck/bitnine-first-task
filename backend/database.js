const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5455,
    user: 'mostafa',
    password: '123',
    database: 'postgresDB'
});

const connectWithRetry = () => {
    console.log('connecting to database...');
    client.connect()
        .catch((err) => {
            console.log("Retrying to connect to database...")
            setTimeout(connectWithRetry, 5000);
        });
};

module.exports = {client, connectWithRetry};