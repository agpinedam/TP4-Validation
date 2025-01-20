const express = require('express');
const db = require('../db');
const router = express.Router();

// Obtener cursos por formador
router.get('/instructor/:instructorId', async (req, res) => {
    const { instructorId } = req.params;

    try {
        const result = await db.query(
            `SELECT * FROM courses WHERE instructor_id = $1`,
            [instructorId]
        );

        res.status(200).json({ courses: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des cours' });
    }
});

// Crear un nuevo curso
router.post('/', async (req, res) => {
    const { title, date, time, location, instructorId } = req.body;

    if (!title || !date || !time || !location || !instructorId) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs obligatoires' });
    }

    try {
        const result = await db.query(
            `INSERT INTO courses (title, date, time, location, instructor_id) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [title, date, time, location, instructorId]
        );

        res.status(201).json({ message: 'Cours créé avec succès', course: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du cours' });
    }
});

// Editar curso
router.put('/:courseId', async (req, res) => {
    const { courseId } = req.params;
    const { title, date, time, location } = req.body;

    if (!title || !date || !time || !location) {
        return res.status(400).json({ error: 'Veuillez remplir le champs domaine' });
    }

    try {
        const result = await db.query(
            `UPDATE courses 
             SET title = $1, date = $2, time = $3, location = $4 
             WHERE id = $5 RETURNING *`,
            [title, date, time, location, courseId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cours non trouvé' });
        }

        res.status(200).json({ message: 'Cours mis à jour avec succès', course: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du cours' });
    }
});

// Supprimer un curso
router.delete('/:courseId', async (req, res) => {
    const { courseId } = req.params;

    try {
        const result = await db.query(
            `DELETE FROM courses WHERE id = $1 RETURNING *`,
            [courseId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cours non trouvé' });
        }

        res.status(200).json({ message: 'Cours supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du cours' });
    }
});

module.exports = router;
