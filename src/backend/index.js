const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const profileRoutes = require('./routes/profile')
const searchRoutes = require('./routes/search');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/search', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
