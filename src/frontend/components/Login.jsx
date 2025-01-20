import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validaciones de campos vacíos
        if (!email || !password) {
            setMessage('Veuillez remplir le champs sélectionné');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            // Validación de error en credenciales
            if (response.ok) {
                setMessage(`Bienvenue, ${data.user.name}`);
            } else {
                setMessage('Email ou mot de passe incorrect, veuillez réessayer');
            }
        } catch (error) {
            setMessage('Erreur de connexion au serveur');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-grayLight font-sans">
            <div className="bg-whiteCustom p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-blueCustom mb-6 text-center">Connexion</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Entrez votre email"
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Mot de passe</label>
                        <input
                            type="password"
                            placeholder="Entrez votre mot de passe"
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label className="text-gray-700">Se souvenir de moi</label>
                    </div>
                    <button
                        type="submit"
                        className="bg-blueCustom text-whiteCustom w-full py-2 rounded-lg hover:bg-blue-600"
                    >
                        Se connecter
                    </button>
                </form>
                {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
