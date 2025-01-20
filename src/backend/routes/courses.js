const express = require('express');
const db = require('../db');

const router = express.Router();

// Crear un curso
router.post('/', async (req, res) => {
    const { title, date, time, location, instructorId } = req.body;

    if (!title || !date || !time || !location) {
        return res.status(400).json({ error: 'Veuillez remplir le champs domaine' });
    }

    try {
        await db.query(
            'INSERT INTO courses (title, date, time, location, instructor_id) VALUES ($1, $2, $3, $4, $5)',
            [title, date, time, location, instructorId]
        );
        res.status(201).json({ message: 'Cours créé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du cours' });
    }
});

// Editar un curso
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, date, time, location } = req.body;

    if (!title || !date || !time || !location) {
        return res.status(400).json({ error: 'Veuillez remplir le champs domaine' });
    }

    try {
        await db.query(
            'UPDATE courses SET title = $1, date = $2, time = $3, location = $4 WHERE id = $5',
            [title, date, time, location, id]
        );
        res.status(200).json({ message: 'Cours mis à jour avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du cours' });
    }
});

// Eliminar un curso
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM courses WHERE id = $1', [id]);
        res.status(200).json({ message: 'Cours supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du cours' });
    }
});

module.exports = router;
