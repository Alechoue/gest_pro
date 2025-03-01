const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Réserver un projecteur
router.post('/', async (req, res) => {
  const { user_id, projector_id, start_time, end_time } = req.body;

  if (!user_id || !projector_id || !start_time || !end_time) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    // Vérifier si le projecteur est disponible
    const [projector] = await db.promise().query(
      'SELECT availability FROM projectors WHERE id = ?',
      [projector_id]
    );

    if (projector.length === 0) {
      return res.status(404).json({ message: 'Projecteur non trouvé' });
    }

    if (!projector[0].availability) {
      return res.status(400).json({ message: 'Ce projecteur n’est pas disponible' });
    }

    // Ajouter la réservation
    await db.promise().query(
      'INSERT INTO reservations (user_id, projector_id, start_time, end_time) VALUES (?, ?, ?, ?)',
      [user_id, projector_id, start_time, end_time]
    );

    res.status(201).json({ message: 'Réservation effectuée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
