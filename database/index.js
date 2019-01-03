const pool = require('./config').pool

const getUsers = (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.log('ERROR:'+error);
      throw error
    }
    res.json(results.rows)
  })
}

const createUser = (req, res) => {
  // console.log(req.body);
  const { name, email } = req.body

  pool.query(`INSERT INTO users (name, email) VALUES ('${name}', '${email}') RETURNING *`, (error, results) => {
    if (error) {
      console.log('ERROR:'+error);
      throw error
    }
    console.log('Row inserted in DB'+results.rows);
    res.send({result:results.rows})
  })
}

const updateUser = (req, res) => {
  const { name, email } = req.body
  const id = parseInt(req.body.id)

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        console.log('ERROR:'+error);
        throw error
      }
      res.send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (req, res) => {
  const id = parseInt(req.body.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log('ERROR:'+error);
      throw error
    }
    res.send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
}
