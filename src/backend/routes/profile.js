const express = require('express');
const db = require('../db');

const router = express.Router();

// Mostrar perfil del usuario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { about, experience, photo, phone, address, userType } = req.body;

    if (!userType) {
        return res.status(400).json({ error: 'Veuillez remplir le champs domaine' });
    }

    try {
        const result = await db.query(
            `UPDATE users SET about = $1, experience = $2, photo = $3, phone = $4, address = $5, user_type = $6 WHERE id = $7 RETURNING *`,
            [about, experience, photo, phone, address, userType, id]
        );

        res.status(200).json({ message: 'Profil mis à jour avec succès', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
    }
});


// Editar perfil del usuario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { about, experience, photo, phone, address, userType } = req.body;

    if (!userType) {
        return res.status(400).json({ error: 'Veuillez remplir le champs domaine' });
    }

    try {
        await db.query(
            `UPDATE users SET about = $1, experience = $2, photo = $3, phone = $4, address = $5, user_type = $6 WHERE id = $7`,
            [about, experience, photo, phone, address, userType, id]
        );
        res.status(200).json({ message: 'Profil mis à jour avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
    }
});

// Eliminar perfil
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(200).json({ message: 'Compte utilisateur supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du profil' });
    }
});

module.exports = router;
