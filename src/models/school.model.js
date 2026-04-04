const pool = require('../config/db');

async function createSchool({ name, address, latitude, longitude, createdBy }) {
  const [result] = await pool.execute(
    `INSERT INTO schools (name, address, latitude, longitude, created_by)
     VALUES (?, ?, ?, ?, ?)`,
    [name, address, latitude, longitude, createdBy || null]
  );

  return {
    id: result.insertId,
    name,
    address,
    latitude,
    longitude,
    createdBy: createdBy || null
  };
}

async function getAllSchools({ search = '' }) {
  let query = `
    SELECT id, name, address, latitude, longitude, created_at
    FROM schools
    WHERE is_deleted = FALSE
  `;
  const values = [];

  if (search) {
    query += ' AND (name LIKE ? OR address LIKE ?)';
    values.push(`%${search}%`, `%${search}%`);
  }

  query += ' ORDER BY created_at DESC';

  const [rows] = await pool.execute(query, values);
  return rows;
}

async function softDeleteSchool(id) {
  const [result] = await pool.execute(
    'UPDATE schools SET is_deleted = TRUE WHERE id = ? AND is_deleted = FALSE',
    [id]
  );

  return result.affectedRows > 0;
}

module.exports = {
  createSchool,
  getAllSchools,
  softDeleteSchool
};
