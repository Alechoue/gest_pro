const db = require('../config/db');

exports.addProjector = (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO projectors (name) VALUES (?)', [name], err => {
    if (err) return res.status(500).json({ error: 'Erreur lors de l\'ajout' });
    res.json({ message: 'Projecteur ajouté' });
  });
};

exports.getProjectors = (req, res) => {
  db.query('SELECT * FROM projectors', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur' });
    res.json(results);
  });
};
