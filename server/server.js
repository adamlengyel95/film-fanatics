const express = require('express');
const db = require('./db/db');

const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Hello from express!');
});

app.get('/movies', (req, res) => {
    db.query('SELECT * FROM movies WHERE movies.release_date > "2010.01.01"', (err, rows, fields) => {
        res.json(rows);
        console.log('Fetched movies succesfully!');
    })
});

app.get('/test', (req, res) => {
    const data = [
        {title: 'Test message', content: 'Hello from the server.'}
    ]
    res.json(data);
});

app.listen(PORT, () => {
    console.log('Server is running on port:',PORT);
});