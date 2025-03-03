const db = require('../config/db');

exports.bookProjector = (req, res) => {
  const { projector_id, timeslot } = req.body;
  db.query('INSERT INTO reservations (user_id, projector_id, timeslot) VALUES (?, ?, ?)',
    [req.user.id, projector_id, timeslot], err => {
      if (err) return res.status(500).json({ error: 'Erreur' });
      res.json({ message: 'Réservation effectuée' });
    });
};

exports.getReservations = (req, res) => {
  db.query('SELECT * FROM reservations', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur' });
    res.json(results);
  });
};
