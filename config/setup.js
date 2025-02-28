const db = require('./db');

const createTables = () => {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'student'
    );
  `;

  const projectorsTable = `
    CREATE TABLE IF NOT EXISTS projectors (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'available'
    );
  `;

  const reservationsTable = `
    CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER,
        projector_id INTEGER,
        timeslot DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (projector_id) REFERENCES projectors(id)
    );
  `;

  db.query(usersTable, err => {
    if (err) console.error('Users table creation error:', err);
  });

  db.query(projectorsTable, err => {
    if (err) console.error('Projectors Table Creation Error:', err);
  });

  db.query(reservationsTable, err => {
    if (err) console.error('Reservations table creation error:', err);
  });

  console.log('Successfully created tables.');
};

createTables();
