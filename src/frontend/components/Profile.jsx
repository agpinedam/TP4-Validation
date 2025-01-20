import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState(null); // Datos del perfil que se está viendo
    const [viewer, setViewer] = useState(null);   // Usuario actualmente logueado
    const [courses, setCourses] = useState([]);   // Cursos asociados al perfil
    const { userId } = useParams();               // ID del perfil actual
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar datos del usuario logueado desde localStorage
        const viewerData = localStorage.getItem('user');
        if (viewerData) {
            setViewer(JSON.parse(viewerData));
        } else {
            console.error('Usuario logueado no encontrado');
            navigate('/login');
        }

        // Obtener datos del perfil desde el backend
        fetch(`/api/users/${userId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération du profil');
                }
                return response.json();
            })
            .then((data) => setProfile(data.user))
            .catch((error) => console.error(error));
    }, [userId, navigate]);

    useEffect(() => {
        if (profile) {
            // Obtener los cursos asociados al perfil
            fetch(`/api/courses/user/${profile.id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la récupération des cours');
                    }
                    return response.json();
                })
                .then((data) => setCourses(data.courses))
                .catch((error) => console.error(error));
        }
    }, [profile]);

    if (!profile || !viewer) {
        return <p className="text-gray-700 text-lg">Chargement...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Profil utilisateur</h2>
                <p className="text-gray-700 mb-4">Nom: {profile.surname}</p>
                <p className="text-gray-700 mb-4">Prénom: {profile.name}</p>
                <p className="text-gray-700 mb-4">Email: {profile.email}</p>
                <p className="text-gray-700 mb-4">À propos: {profile.about || 'Non renseigné'}</p>
                <p className="text-gray-700 mb-4">Numéro de téléphone: {profile.phone || 'Non renseigné'}</p>
                <p className="text-gray-700 mb-4">Adresse: {profile.address || 'Non renseigné'}</p>
                <p className="text-gray-700 mb-4">
                    Type d'utilisateur: {profile.user_type === 'Formateur' ? 'Formateur' : 'Apprenant'}
                </p>

                {/* Botones según el contexto */}
                {viewer.id === profile.id ? (
                    <>
                        <button
                            onClick={() => navigate('/edit-profile')}
                            className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 mb-4"
                        >
                            Éditer le profil
                        </button>
                        {viewer.user_type === 'Formateur' && (
                            <button
                                onClick={() => navigate('/create-course')}
                                className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600 mb-4"
                            >
                                Ajouter un cours
                            </button>
                        )}
                    </>
                ) : (
                    profile.user_type === 'Formateur' && (
                        <button
                            onClick={() => navigate(`/reserve-course/${profile.id}`)}
                            className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600"
                        >
                            Réserver un cours
                        </button>
                    )
                )}

                {/* Lista de cursos */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Cours associés</h3>
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
