const router = require('express').Router();
const db = require('../db/db');


function query() {
    db.query('SELECT * FROM movies WHERE movies.release_date > "2010.01.01"', (err, rows, fields) => {
        return new Promise((resolve, reject) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

function getMovies() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM movies WHERE movies.release_date > "2010.01.01"', (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

router.get('/', (req, res) => {
    getMovies().then((result) => console.log(result));
    db.query('SELECT * FROM movies WHERE movies.release_date > "2010.01.01"', (err, rows, fields) => {
        res.json(rows);
    })
});

router.get('/search', (req, res) => {
    db.query(`SELECT * FROM movies WHERE movies.title LIKE "%${req.query.title}%"`, (err, rows, fields) => {
        res.json(rows);
    })
});

router.post('/rate', (req, res) => {
    db.query(`SELECT * FROM rates WHERE rates.movie_id=${req.query.movieId} AND rates.user_id=${req.query.userId}`, (err, rows, fields) => {
        if (err) {
            res.status(500).send({message: 'Error occured during fetching rating: ', error: err});
        } else if(rows.length > 0) {
            db.query(`UPDATE rates
            SET rating = ${req.query.rating}
            WHERE rates.movie_id=${req.query.movieId} AND rates.user_id=${req.query.userId}`, (err, rows, fields) => {
                if (err) {
                    res.status(500).send({message: 'Error occured during updating rating', error: err})
                } else {
                    res.json({message: 'Rating updated successfully'})
                }
            })
        } else {
            db.query(`INSERT INTO rates VALUES(${req.query.movieId},${req.query.userId},${req.query.rating})`, (err, rows, fields) => {
                if (err) {
                    res.status(500).send({message: 'Error occured during adding rating: ', error: err});
                } else {
                    res.json({message: 'Movie successfully rated'})
                }
            })
        }
    })
})

module.exports = router;
