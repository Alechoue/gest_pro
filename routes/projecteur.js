const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Ajouter un projecteur
router.post('/', async (req, res) => {
  const { name, status, availability } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Le nom du projecteur est requis' });
  }

  try {
    await db.promise().query(
      'INSERT INTO projectors (name, status, availability) VALUES (?, ?, ?)',
      [name, status || 'fonctionnel', availability !== undefined ? availability : true]
    );

    res.status(201).json({ message: 'Projecteur ajouté avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Récupérer tous les projecteurs
router.get('/', async (req, res) => {
    try {
      const [rows] = await db.promise().query('SELECT * FROM projectors');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });

  // Modifier un projecteur
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, status, availability } = req.body;
  
    try {
      // Vérifier si le projecteur existe
      const [existingProjector] = await db.promise().query('SELECT * FROM projectors WHERE id = ?', [id]);
      if (existingProjector.length === 0) {
        return res.status(404).json({ message: 'Projecteur non trouvé' });
      }
  
      // Mettre à jour le projecteur
      await db.promise().query(
        'UPDATE projectors SET name = ?, status = ?, availability = ? WHERE id = ?',
        [
          name || existingProjector[0].name,
          status || existingProjector[0].status,
          availability !== undefined ? availability : existingProjector[0].availability,
          id
        ]
      );
  
      res.json({ message: 'Projecteur mis à jour avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  

  // Supprimer un projecteur
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Vérifier si le projecteur existe
      const [existingProjector] = await db.promise().query('SELECT * FROM projectors WHERE id = ?', [id]);
      if (existingProjector.length === 0) {
        return res.status(404).json({ message: 'Projecteur non trouvé' });
      }
  
      // Supprimer le projecteur
      await db.promise().query('DELETE FROM projectors WHERE id = ?', [id]);
  
      res.json({ message: 'Projecteur supprimé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  
  
module.exports = router;
