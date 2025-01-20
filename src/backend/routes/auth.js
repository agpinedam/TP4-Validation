const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { email, password, confirmPassword, name, surname, userType, acceptTerms } = req.body;

    // Validaciones básicas
    if (!email || !password || !confirmPassword || !name || !surname || !userType || acceptTerms === false) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs obligatoires' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Les mots de passe ne correspondent pas' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Cette adresse e-mail est non valide' });
    }

    if (password.length < 8 || !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/.test(password)) {
        return res.status(400).json({
            error: 'Votre mot de passe doit contenir un chiffre, un caractère minuscule, un caractère majuscule et un caractère spécial.',
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            'INSERT INTO users (email, password, name, surname, user_type, accept_terms) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [email, hashedPassword, name, surname, userType, acceptTerms]
        );

        res.status(201).json({ message: 'Utilisateur enregistré avec succès', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        if (error.code === '23505') {
            res.status(400).json({ error: 'Votre email existe déjà, veuillez vous connecter' });
        } else {
            res.status(500).json({ error: 'Erreur lors de l\'inscription' });
        }
    }
});

// Login de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

module.exports = router;
