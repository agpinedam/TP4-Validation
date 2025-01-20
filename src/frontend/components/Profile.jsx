import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    if (!user) {
        return <p className="text-gray-700 text-lg">Chargement...</p>;
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
                <p className="text-gray-700 mb-4">
                    Type d'utilisateur: {user.user_type === 'Formateur' ? 'Formateur' : 'Apprenant'}
                </p>

                {/* Botón para editar el perfil */}
                <button
                    onClick={() => navigate('/edit-profile')}
                    className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 mb-4"
                >
                    Éditer le profil
                </button>

                {/* Botón adicional para formadores */}
                {user.user_type === 'Formateur' && (
                    <button
                        onClick={() => navigate('/create-course')}
                        className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600"
                    >
                        Ajouter un cours
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;
