const db = require('../db/db');

module.exports = {
    getMovieById: (movieId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM movies WHERE movie_id=${movieId}`, (err, rows, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        })
    },
    getArtistsByMovieId: (movieId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT artists.artist_id as artistId, artists.artist_name as artistName, works_on.works_as as worksAs
            FROM works_on, artists 
            WHERE works_on.movie_id=${movieId} AND works_on.artist_id = artists.artist_id`,
            (err, rows, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        });
    },
    getRatingByMovieId: (movieId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT AVG(rating) AS rating FROM rates WHERE movie_id=${movieId}`,
            (err, rows, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    },
    getCommentsByMovieId: (movieId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT users.display_name AS displayName, comments.content AS content
            FROM comments, users
            WHERE users.user_id = comments.user_id AND comments.movie_id = ${movieId}`,
            (err, rows, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }
}