import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        fetch(`/api/courses/${userId}`)
            .then((response) => response.json())
            .then((data) => setCourses(data.courses))
            .catch((error) => console.error('Erreur lors de la récupération des cours:', error));
    }, []);

    const handleEdit = (course) => {
        setSelectedCourse(course);
        navigate('/edit-course', { state: course });
    };

    const handleDelete = async (courseId) => {
        if (window.confirm('Etes-vous sûr de vouloir supprimer ce cours ?')) {
            try {
                const response = await fetch(`/api/courses/${courseId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setCourses(courses.filter((course) => course.id !== courseId));
                    alert('Cours supprimé avec succès');
                }
            } catch (error) {
                console.error('Erreur lors de la suppression du cours:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold text-blue-500 mb-6">Calendrier des cours</h1>
            <ul>
                {courses.map((course) => (
                    <li key={course.id} className="mb-4 bg-white p-4 shadow rounded-lg">
                        <h2 className="text-lg font-semibold">{course.title}</h2>
                        <p>{course.date} à {course.time}</p>
                        <p>Lieu: {course.location}</p>
                        <button
                            onClick={() => handleEdit(course)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                        >
                            Modifier
                        </button>
                        <button
                            onClick={() => handleDelete(course.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Calendar;
