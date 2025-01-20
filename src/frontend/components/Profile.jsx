import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Obtener los datos del usuario desde localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            setUser(null);
        }
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-700 text-lg">Chargement...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Profil utilisateur</h2>
                <p className="text-gray-700 mb-4">Nom: {user.surname}</p>
                <p className="text-gray-700 mb-4">Prénom: {user.name}</p>
                <p className="text-gray-700 mb-4">Email: {user.email}</p>
                <p className="text-gray-700 mb-4">À propos: {user.about || 'Non renseigné'}</p>
                <p className="text-gray-700 mb-4">Numéro de téléphone: {user.phone || 'Non renseigné'}</p>
                <p className="text-gray-700 mb-4">Adresse: {user.address || 'Non renseigné'}</p>
            </div>
        </div>
    );
};

export default Profile;
