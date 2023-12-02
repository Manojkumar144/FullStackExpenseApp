const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sql@9944',
  database: 'node-complete',
  port: 3307,
});

module.exports = db;