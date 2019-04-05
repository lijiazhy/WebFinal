const mongoose = require('mongoose');

const user = mongoose.Schema({
    userName: String,
    passWord: String,
    products: [{
        productName: String,
        productPrice: String
    }]
});

module.exports = mongoose.model('User', user);