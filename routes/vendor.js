const express = require('express');
const router = express.Router();

// Vendor login route
router.get('/login', (req, res) => {
    res.render('vendor/login');
});

// Handle vendor login POST request
router.post('/login', (req, res) => {
    // Your login logic here
    res.redirect('/vendor/dashboard');
});

module.exports = router;
