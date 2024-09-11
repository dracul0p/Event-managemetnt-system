const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: String,
    email: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Vendor', vendorSchema);
