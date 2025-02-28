const express = require('express');
const router = express.Router();
const authMiddleware = require('./middlewares/authMiddleware');
const db = require('../config/database');

// Réserver un projecteur seulement s’il en reste
router.post('/reservations', authMiddleware, async (req, res) => {
    try {
        const { student_id, projector_id, reservation_time } = req.body;

        // Vérifier si le projecteur est disponible
        const [rows] = await db.query("SELECT * FROM projectors WHERE id = ? AND available = 1", [projector_id]);
        
        if (rows.length === 0) {
            return res.status(400).json({ message: "Aucun projecteur disponible à ce moment-là." });
        }

        // Ajouter la réservation
        await db.query("INSERT INTO reservations (student_id, projector_id, reservation_time) VALUES (?, ?, ?)", 
            [student_id, projector_id, reservation_time]);

        // Mettre à jour la disponibilité du projecteur
        await db.query("UPDATE projectors SET available = 0 WHERE id = ?", [projector_id]);

        res.json({ message: "Réservation effectuée avec succès." });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;
