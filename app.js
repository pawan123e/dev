const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes')
const postsRoutes = require('./routes/postsRoutes')
const AppError = require('./utils/AppError');
const errorController = require('./controller/errorController')
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);

app.all('*', (req, res, next) => {
        next(new AppError('Invalid routes', 400));
})

app.use(errorController)
module.exports = app;