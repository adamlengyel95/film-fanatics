const router = require('express').Router();
const db = require('../db/db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM movies WHERE movies.release_date > "2010.01.01"', (err, rows, fields) => {
        res.json(rows);
    })
});

router.get('/search', (req, res) => {
    db.query(`SELECT * FROM movies WHERE movies.title LIKE "%${req.query.title}%"`, (err, rows, fields) => {
        res.json(rows);
    })
});

module.exports = router;
