// Create a router instance to which we can attach routes
const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
    //Render login page, in our case it will be done in react
});

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//auth logout
router.get('/logout', (req, res) => {
    res.send('logging out');
});

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('you reached callback uri');
});

module.exports = router;
