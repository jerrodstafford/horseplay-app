const { Client } = require('pg');
const connectionString =
  process.env.DATABASE_URL || 'https://localhost:5432/horseplay-dev';



const client = new Client(
  connectionString
);

module.exports = client;
