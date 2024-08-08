const mysql = require("mysql2");
require("dotenv").config();
const queries = require("./dbQueries");

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

conn.connect((err) => {
  if (err) console.log(err);
  else {
    console.log("Connected to database");
    conn.query(queries.createTableUser, (err, result) => {
      if (err) console.log(err);
    });
    conn.query(queries.createTableTodo, (err, result) => {
      if (err) console.log(err);
    });
  }
});

module.exports = conn;
