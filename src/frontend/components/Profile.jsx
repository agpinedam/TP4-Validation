import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar los datos del usuario desde localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);

            // Cargar los cursos asociados al usuario
            fetch(`/api/courses/user/${parsedUser.id}`)
                .then((response) => response.json())
                .then((data) => setCourses(data.courses))
                .catch((error) => console.error('Erreur lors de la récupération des cours:', error));
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
                        className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600 mb-4"
                    >
                        Ajouter un cours
                    </button>
                )}

                {/* Lista de cursos */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Mes cours</h3>
                    {courses.length > 0 ? (
                        <ul>
                            {courses.map((course) => (
                                <li
                                    key={course.id}
                                    className="mb-4 bg-gray-200 p-4 rounded-lg shadow"
                                >
                                    <h4 className="text-lg font-semibold">{course.title}</h4>
                                    <p>
                                        {course.date} à {course.time}
                                    </p>
                                    <p>Lieu: {course.location}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Aucun cours associé</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
