import React, { useState } from 'react';

const QuickSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
    
        if (!query) {
            setError('Veuillez remplir le champs sélectionné.');
            return;
        }
    
        try {
            const response = await fetch(`/api/search/quick?query=${encodeURIComponent(query)}`);
            const data = await response.json();
    
            if (response.ok) {
                setResults([...data.courses, ...data.users]);
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
        <div className="p-4 bg-gray-100">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-gray-300 rounded-lg w-full p-2"
                    placeholder="Rechercher..."
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2">
                    Rechercher
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {results.length > 0 && (
                <ul className="mt-6">
                    {results.map((result, index) => (
                        <li key={index} className="p-4 bg-white mb-4 shadow rounded-lg">
                            {result.title || `${result.name} ${result.surname}`}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default QuickSearch;
