import React, { useState } from 'react';

const AdvancedSearch = () => {
    const [domaine, setDomaine] = useState('');
    const [ville, setVille] = useState('');
    const [categories, setCategories] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!domaine) {
            setError('Veuillez remplir le champs domaine.');
            return;
        }

        try {
            const response = await fetch(
                `/api/search/advanced?domaine=${domaine}&ville=${ville}&categories=${categories}`
            );
            const data = await response.json();

            if (response.ok) {
                setResults(data.courses);
                setError('');
            } else {
                setError(data.error);
                setResults([]);
            }
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            setError('Erreur lors de la recherche.');
        }
    };

    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Recherche Avancée</h2>
            <form onSubmit={handleSearch}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Domaine</label>
                    <input
                        type="text"
                        value={domaine}
                        onChange={(e) => setDomaine(e.target.value)}
                        className="border border-gray-300 rounded-lg w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Ville</label>
                    <input
                        type="text"
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                        className="border border-gray-300 rounded-lg w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Catégories</label>
                    <input
                        type="text"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        className="border border-gray-300 rounded-lg w-full p-2"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                    Rechercher
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {results.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold">Résultats:</h3>
                    <ul>
                        {results.map((course) => (
                            <li key={course.id} className="p-4 bg-white mb-4 shadow rounded-lg">
                                <h4 className="text-lg font-semibold">{course.title}</h4>
                                <p>Domaine: {course.domaine}</p>
                                <p>Ville: {course.ville}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdvancedSearch;
