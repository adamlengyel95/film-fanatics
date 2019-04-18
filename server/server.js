const express = require('express');
const db = require('./db/db');
const authRoutes = require('./routes/auth-routes');
const  passportSetup = require('./config/passport-setup');
const bodyParser = require('body-parser')
const app = express();

const PORT = 5000;

app.use(bodyParser());
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
    var post  = {google_id: "32352323", display_name: 'Adam MySQL'};
    db.query('INSERT INTO users SET ?', post, function (error, results, fields) {
        if (error) throw error;
        console.log(results.insertId);
        res.send(results);
      });
    
});

app.listen(PORT, () => {
    console.log('Server is running on port:',PORT);
});