const pool = require('../config/db');

async function createUser({ name, email, password }) {
  const [result] = await pool.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );

  return { id: result.insertId, name, email };
}

async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    'SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1',
    [email]
  );

  return rows[0] || null;
}

async function findUserById(id) {
  const [rows] = await pool.execute(
    'SELECT id, name, email FROM users WHERE id = ? LIMIT 1',
    [id]
  );

  return rows[0] || null;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};
