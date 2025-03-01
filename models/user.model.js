const db = require('../config/db');
const bcrypt = require('bcrypt');

// Ajouter un utilisateur (inscription)
const createUser = async (username, email, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.promise().query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

// Trouver un utilisateur par email (connexion)
const findUserByEmail = async (email) => {
  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

// Trouver un utilisateur par ID
const findUserById = async (id) => {
  try {
    const [rows] = await db.promise().query(
      'SELECT id, username, email, role FROM users WHERE id = ?',
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

// Mettre à jour un utilisateur
const updateUser = async (id, username, email, role) => {
  try {
    await db.promise().query(
      'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?',
      [username, email, role, id]
    );
    return true;
  } catch (error) {
    throw error;
  }
};

// Supprimer un utilisateur
const deleteUser = async (id) => {
  try {
    await db.promise().query('DELETE FROM users WHERE id = ?', [id]);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser
};
