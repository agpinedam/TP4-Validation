import React from 'react';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    return (
        <div>
            <h1>Bienvenue sur Split</h1>
            <Login />
            <Register />
        </div>
    );
};

export default App;
