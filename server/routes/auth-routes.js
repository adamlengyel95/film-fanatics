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
    req.logout();
    res.redirect('http://localhost:3000');
});

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log('Logged in:', req.user.display_name);
    //res.send(req.user);
    res.redirect('http://localhost:3000/profile');
});

module.exports = router;
