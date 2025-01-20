import React, { useState, useEffect } from 'react';

const InstructorCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const instructorId = JSON.parse(localStorage.getItem('user')).id;
        fetch(`/api/courses/instructor/${instructorId}`)
            .then((response) => response.json())
            .then((data) => setCourses(data.courses))
            .catch((error) => console.error('Erreur lors de la récupération des cours:', error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold text-blue-500 mb-6">Mes cours</h1>
            <ul>
                {courses.map((course) => (
                    <li key={course.id} className="mb-4 bg-white p-4 shadow rounded-lg">
                        <h2 className="text-lg font-semibold">{course.title}</h2>
                        <p>{course.date} à {course.time}</p>
                        <p>Lieu: {course.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InstructorCourses;
