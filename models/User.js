const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String // Admin, User, or Vendor
});

module.exports = mongoose.model('User', userSchema);
