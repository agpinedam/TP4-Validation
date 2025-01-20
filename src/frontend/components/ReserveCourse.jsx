import React, { useState, useEffect } from 'react';

const ReserveCourse = ({ instructorId }) => {
    const [form, setForm] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
    });
    const [busySlots, setBusySlots] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch(`/api/courses/availability/${instructorId}`)
            .then((response) => response.json())
            .then((data) => setBusySlots(data.busySlots))
            .catch((error) => console.error('Erreur lors de la récupération des disponibilités:', error));
    }, [instructorId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const studentId = JSON.parse(localStorage.getItem('user')).id;

        try {
            const response = await fetch('/api/courses/reserve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, instructorId, studentId }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Cours réservé avec succès');
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error('Erreur lors de la réservation du cours:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold text-blue-500 mb-6">Réserver un cours</h1>
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
                    <label className="block text-gray-700 mb-2">Présentiel/Distanciel</label>
                    <select
                        className="border border-gray-300 rounded-lg w-full p-2"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        required
                    >
                        <option value="">Sélectionner</option>
                        <option value="Présentiel">Présentiel</option>
                        <option value="Distanciel">Distanciel</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Réserver
                </button>
                {message && <p className="text-green-500 mt-4">{message}</p>}
            </form>
            <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-700">Créneaux occupés:</h2>
                <ul>
                    {busySlots.map((slot, index) => (
                        <li key={index} className="text-gray-700">
                            {slot.date} à {slot.time}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ReserveCourse;
