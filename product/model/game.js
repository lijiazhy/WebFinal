const mongoose = require("mongoose");

const game = mongoose.Schema({
    gameName: String,
    description: String,
    gamePrice: Number,
    company: String,
    pictuer1: String,
    picture2: String,
    url: String
})

module.exports = mongoose.model('Game', game);