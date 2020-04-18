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

router.get('/director', (req, res) => {
    artistService.getDirectorsByName(req.query.name)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({ message: 'Error occured during fetching directors by name', errors: err })
        })
})

router.get('/actor', (req, res) => {
    artistService.getActorsByName(req.query.name)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({ message: 'Error occured during fetching actors by name', errors: err })
        })
})

router.get('/:artistId', (req, res) => {
    artistService.getArtistDetails(req.params.artistId)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({ message: 'Error occured during fetching artist details', errors: err })
        })
})

module.exports = router;