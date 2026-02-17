const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "rekrutacja",
  password: "ZAQ!2wsx",
  port: 5432,
});

module.exports = pool;
