import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

const EditProfile = () => {
    const { user, setUser } = useContext(UserContext);
    const [form, setForm] = useState({ ...user });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/profile/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data.user); // Actualizar el contexto
                setMessage('Profil mis à jour avec succès');
            } else {
                setMessage(data.error || 'Erreur lors de la mise à jour');
            }
        } catch (err) {
            setMessage('Erreur de connexion au serveur');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-grayLight font-sans">
            <div className="bg-whiteCustom p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-blueCustom mb-6 text-center">Modifier mon profil</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">À propos</label>
                        <textarea
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-blue-500"
                            value={form.about || ''}
                            onChange={(e) => setForm({ ...form, about: e.target.value })}
                        />
                    </div>
                    {/* Agregar más campos aquí */}
                    <button
                        type="submit"
                        className="bg-blueCustom text-whiteCustom w-full py-2 rounded-lg hover:bg-blue-600"
                    >
                        Mettre à jour
                    </button>
                </form>
                {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
            </div>
        </div>
    );
};

export default EditProfile;
