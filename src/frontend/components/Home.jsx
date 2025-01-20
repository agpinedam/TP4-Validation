import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-grayLight flex flex-col items-center justify-center font-sans">
            <h1 className="text-blueCustom text-4xl font-semibold mb-4 text-center">
                Bienvenue à Split
            </h1>
            <p className="text-grayDark text-lg mb-8 text-center">
                Connectez-vous ou créez un compte pour commencer
            </p>
            <div className="flex gap-6">
                <button
                    className="bg-blueCustom text-whiteCustom px-6 py-2 rounded-lg shadow hover:bg-blue-600"
                    onClick={() => navigate('/login')}
                >
                    Connexion
                </button>
                <button
                    className="bg-grayDark text-whiteCustom px-6 py-2 rounded-lg shadow hover:bg-gray-500"
                    onClick={() => navigate('/register')}
                >
                    Inscription
                </button>
            </div>
        </div>
    );
};

export default Home;
