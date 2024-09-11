const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Admin login page
router.get('/login', (req, res) => {
    res.render('admin/login');
});

// Admin signup page
router.get('/signup', (req, res) => {
    res.render('admin/signup');
});

// Admin signup form submission
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role: 'Admin' });
    await newUser.save();
    res.redirect('/admin/login');
});

// Admin login form submission
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, role: 'Admin' });

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        res.redirect('/admin/dashboard');
    } else {
        res.render('admin/login', { error: 'Invalid credentials' });
    }
});

// Admin dashboard
router.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/admin/login');
    }
    res.render('admin/dashboard');
});

module.exports = router;
