const mongoose = require('mongoose');

const user = mongoose.Schema({
    userName: String,
    passWord: String,
    products: [{
        productName: String,
        //-1: unowened  favorate
        //0: own unfavorate
        //1: own favorate
        state: Number
    }]
});

module.exports = mongoose.model('User', user);