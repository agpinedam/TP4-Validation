const express = require('express');
const db = require('../db');

const router = express.Router();

// Crear un curso
router.post('/', async (req, res) => {
    const { title, date, time, userId } = req.body;

    try {
        await db.query(
            'INSERT INTO courses (title, date, time, user_id) VALUES ($1, $2, $3, $4)',
            [title, date, time, userId]
        );
        res.status(201).json({ message: 'Curso creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el curso' });
    }
});

// Obtener cursos de un usuario
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await db.query('SELECT * FROM courses WHERE user_id = $1', [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los cursos' });
    }
});

module.exports = router;
