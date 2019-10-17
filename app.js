const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes')
const postsRoutes = require('./routes/postsRoutes')
const errorController = require('./controller/errorController')
const path = require('path')

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);

if(process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));
    
        app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
    }

app.use(errorController)
module.exports = app;