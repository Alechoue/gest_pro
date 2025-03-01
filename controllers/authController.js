const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

exports.register = (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ message: "Erreur lors du hachage du mot de passe" });

        const sql = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
        db.query(sql, [email, hash, role || 'etudiant'], (err, result) => {
            if (err) return res.status(500).json({ message: "Erreur lors de l'inscription" });

            res.status(201).json({ message: "Utilisateur inscrit avec succès" });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });

        if (results.length === 0) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: "Erreur serveur" });

            if (!isMatch) {
                return res.status(401).json({ message: "Email ou mot de passe incorrect" });
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: "Connexion réussie", token });
        });
    });
};
