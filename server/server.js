const express = require('express');
const db = require('./db/db');
const authRoutes = require('./routes/auth-routes');
const  passportSetup = require('./config/passport-setup');
const app = express();

const PORT = 5000;

// Set up routes
app.use('/auth', authRoutes);

app.get('/movies', (req, res) => {
    db.query('SELECT * FROM movies WHERE movies.release_date > "2010.01.01"', (err, rows, fields) => {
        res.json(rows);
        console.log('Fetched movies succesfully!');
    })
});

// Test DB insertion
app.get('/insert', (req, res) => {
    const id = 1;
    
});

app.listen(PORT, () => {
    console.log('Server is running on port:',PORT);
});