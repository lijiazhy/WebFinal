const mongoose = require('mongoose');

const Product = mongoose.Schema({
    productName: String,
    productPrice: Number
});

module.exports = mongoose.model('Product', Product);