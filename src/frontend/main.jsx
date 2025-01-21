import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Página de inicio
import Login from './components/Login'; // Página de login
import Register from './components/Register'; // Página de registro
import Profile from './components/Profile'; // Página de perfil
import EditProfile from './components/EditProfile'; // Página para editar perfil
import Calendar from './components/Calendar';
import EditCourse from './components/EditCourse';
import CreateCourse from './components/CreateCourse';
import InstructorCourses from './components/InstructorCourses';
import ReserveCourse from './components/ReserveCourse';
import AdvancedSearch from './components/AdvancedSearch';
import QuickSearch from './components/QuickSearch';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/:userId" element={<Profile />} />            
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/edit-course" element={<EditCourse />} />
                <Route path="/create-course" element={<CreateCourse />} />
                <Route path="/my-courses" element={<InstructorCourses />} />
                <Route path="/reserve-course/:instructorId" element={<ReserveCourse />} />
                <Route path="/advanced-search" element={<AdvancedSearch />} />
                <Route path="/quick-search" element={<QuickSearch />} />
            </Routes>
    </BrowserRouter>
);
