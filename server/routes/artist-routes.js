const router = require('express').Router();
const db = require('../db/db');
const artistService = require('../services/artist-service');

router.get('/directors', (req, res) => {
    artistService.getDirectors()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({ message: 'Error occured during fetching directors', errors: err })
        })
});

router.get('/actors', (req, res) => {
    artistService.getActors()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({ message: 'Error occured during fetching actors', errors: err })
        })
});

module.exports = router;