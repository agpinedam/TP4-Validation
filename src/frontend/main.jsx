import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Página de inicio
import Login from './components/Login'; // Página de login
import Register from './components/Register'; // Página de registro
import Profile from './components/Profile'; // Página de perfil
import EditProfile from './components/EditProfile'; // Página para editar perfil

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
    </BrowserRouter>
);
