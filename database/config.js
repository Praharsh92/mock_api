const Pool = require('pg').Pool
const pool = new Pool({
  user: 'pro',
  host: 'localhost',
  database: 'vue_test',
  password: 'password',
  port: 5432,
})

module.exports = { pool }
