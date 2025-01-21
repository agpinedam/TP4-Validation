const express = require('express');
const db = require('../db');
const router = express.Router();

// Recherche avancée
router.get('/advanced', async (req, res) => {
    const { domaine, ville, categories } = req.query;

    if (!domaine) {
        return res.status(400).json({ error: 'Veuillez remplir le champs domaine.' });
    }

    try {
        const query = `
            SELECT * FROM courses 
            WHERE domaine ILIKE $1 
            AND ($2::text IS NULL OR ville ILIKE $2)
            AND ($3::text IS NULL OR categories ILIKE $3)
        `;
        const values = [`%${domaine}%`, ville || null, categories || null];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Aucun résultat.' });
        }

        res.status(200).json({ courses: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la recherche.' });
    }
});

router.get('/quick', async (req, res) => {
    const { query } = req.query;

    // Validar que el parámetro query exista
    if (!query) {
        return res.status(400).json({ error: 'Veuillez remplir le champs sélectionné.' });
    }

    try {
        const coursesQuery = `
            SELECT id, title, domaine, location 
            FROM courses 
            WHERE title ILIKE $1 OR domaine ILIKE $1 OR location ILIKE $1
        `;
        const usersQuery = `
            SELECT id, name, surname 
            FROM users 
            WHERE name ILIKE $1 OR surname ILIKE $1
        `;
        const value = `%${query}%`;

        const [coursesResult, usersResult] = await Promise.all([
            db.query(coursesQuery, [value]),
            db.query(usersQuery, [value]),
        ]);

        if (coursesResult.rows.length === 0 && usersResult.rows.length === 0) {
            return res.status(404).json({ error: 'Aucun résultat n’est lié à votre recherche.' });
        }

        res.status(200).json({
            courses: coursesResult.rows,
            users: usersResult.rows,
        });
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        res.status(500).json({ error: 'Erreur lors de la recherche.' });
    }
});

module.exports = router;