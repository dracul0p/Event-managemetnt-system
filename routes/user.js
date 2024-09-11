const express = require('express');
const router = express.Router();

// User login route
router.get('/login', (req, res) => {
    res.render('user/login');
});

// Handle user login POST request
router.post('/login', (req, res) => {
    // Your login logic here
    res.redirect('/user/dashboard');
});

module.exports = router;
