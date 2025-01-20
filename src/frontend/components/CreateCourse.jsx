import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
    const [form, setForm] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const instructorId = JSON.parse(localStorage.getItem('user')).id;

        try {
            const response = await fetch('/api/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, instructorId }),
            });

            if (response.ok) {
                alert('Cours créé avec succès');
                navigate('/calendar');
            }
        } catch (error) {
            console.error('Erreur lors de la création du cours:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold text-blue-500 mb-6">Créer un cours</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Titre du cours</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg w-full p-2"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Date</label>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-lg w-full p-2"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Heure</label>
                    <input
                        type="time"
                        className="border border-gray-300 rounded-lg w-full p-2"
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Lieu de RDV</label>
                    <select
                        className="border border-gray-300 rounded-lg w-full p-2"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        required
                    >
                        <option value="">Sélectionner</option>
                        <option value="Chez le formateur">Chez le formateur</option>
                        <option value="A distance">A distance</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Créer
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;
