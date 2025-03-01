const express = require('express');
const { createUser } = require('../models/user.model');
const authController = require('../controllers/authController');  // Vérifie le chemin du contrôleur

const router = express.Router();
router.post('/register', authController.register);  // Route pour l'inscription
router.post('/login', authController.login);  // Route pour la connexion

router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
  
    try {
      const userId = await createUser(username, email, password, role);
      res.status(201).json({ message: 'Utilisateur créé avec succès', userId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  
module.exports = router;
