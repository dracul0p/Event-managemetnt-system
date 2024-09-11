const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
mongoose.set('strictQuery', false); // or true based on your preference

mongoose.connect('mongodb://127.0.0.1:27017/libraryManagement')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Session setup
app.use(session({
    secret: 'library_secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/libraryManagement' })
}));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set up EJS templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const vendorRoutes = require('./routes/vendor');

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/vendor', vendorRoutes);

// Index route
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
