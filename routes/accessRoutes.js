const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const db = require('../config/db');  // Connexion à la BD

// 🔐 Route pour voir tous les utilisateurs (ADMIN SEULEMENT)
router.get('/users', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    try {
        const [users] = await db.query("SELECT id, email, role FROM users");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// 🔐 Route pour supprimer un utilisateur (ADMIN SEULEMENT)
router.delete('/users/:id', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM users WHERE id = ?", [id]);
        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
