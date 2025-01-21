import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdvancedSearch from './AdvancedSearch';
import QuickSearch from './QuickSearch';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center font-sans">
            {/* Título */}
            <h1 className="text-blue-500 text-4xl font-semibold mt-8 mb-4 text-center">
                Bienvenue à Split
            </h1>
            {/* Subtítulo */}
            <p className="text-gray-700 text-lg mb-8 text-center">
                Connectez-vous ou créez un compte pour commencer
            </p>
            {/* Botones */}
            <div className="flex gap-6 mb-12">
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                    onClick={() => navigate('/login')}
                >
                    Connexion
                </button>
                <button
                    className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-500 transition duration-300"
                    onClick={() => navigate('/register')}
                >
                    Inscription
                </button>
            </div>
            {/* Section de Recherche */}
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
                {/* Recherche Rapide */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Recherche Rapide</h2>
                    <QuickSearch />
                </div>
                {/* Recherche Avancée */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Recherche Avancée</h2>
                    <AdvancedSearch />
                </div>
            </div>
        </div>
    );
};

export default Home;
