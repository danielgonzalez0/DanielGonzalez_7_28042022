// get the client
const mysql = require('mysql2');
require('dotenv').config();

// create the connection to database
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'social_network',
  password: process.env.SQL_PASSWORD,
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log(`error connecting: ${err}`);
  } else {
    console.log(`connecté à mySQL - ${mysqlConnection.config.database}`);
    console.log(`connecté avec l'id - ${mysqlConnection.threadId}`);
  }
});

module.exports = mysqlConnection;
