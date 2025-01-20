import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Profile = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
        return <p>Chargement...</p>; // Muestra un mensaje de carga si no hay datos del usuario
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-grayLight font-sans">
            <div className="bg-whiteCustom p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-blueCustom mb-6 text-center">Profil utilisateur</h2>
                <p className="text-gray-700 mb-4">Nom: {user.name}</p>
                <p className="text-gray-700 mb-4">Email: {user.email}</p>
                <p className="text-gray-700 mb-4">À propos: {user.about || 'Non renseigné'}</p>
                <p className="text-gray-700 mb-4">Numéro de téléphone: {user.phone || 'Non renseigné'}</p>
                <p className="text-gray-700 mb-4">Adresse: {user.address || 'Non renseigné'}</p>
                <button
                    className="bg-blueCustom text-whiteCustom w-full py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => navigate('/profile/edit')}
                >
                    Modifier mon profil
                </button>
            </div>
        </div>
    );
};

export default Profile;
