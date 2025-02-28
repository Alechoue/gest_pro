const express = require('express');
const router = express.Router();
const authMiddleware = require('./middlewares/authMiddleware');

router.get('/profile', authMiddleware, (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.email,
        role: req.user.role
    });
});

module.exports = router;
