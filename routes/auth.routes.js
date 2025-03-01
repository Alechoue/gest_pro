const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');  // Vérifie le chemin du contrôleur

router.post('/register', authController.register);  // Route pour l'inscription
router.post('/login', authController.login);  // Route pour la connexion

module.exports = router;
