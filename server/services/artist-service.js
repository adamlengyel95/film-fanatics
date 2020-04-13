const db = require('../db/db');

module.exports = {
    getDirectors: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT DISTINCT artists.artist_id AS id, artists.artist_name as name
            FROM artists, works_on
            WHERE artists.artist_id=works_on.artist_id AND works_as LIKE "Rendező" ORDER BY name`,
                (err, rows, fields) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                })
        })
    },
    getActors: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT DISTINCT artists.artist_id AS id, artists.artist_name as name, artists.profile_picture as profilePicture
            FROM artists, works_on
            WHERE artists.artist_id=works_on.artist_id AND works_as LIKE "Színész" OR works_as LIKE "Színésznő"  ORDER BY name`,
                (err, rows, fields) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                })
        })
    }
}