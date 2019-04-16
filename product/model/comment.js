const mongoose = require("mongoose");

const comment = mongoose.Schema({
    content: String,
    userName: String,
    gameName: String
})

module.exports = mongoose.model('Comment',comment);