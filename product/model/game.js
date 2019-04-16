const mongoose = require("mongoose");

const game = mongoose.Schema({
    gameName: String,
    description: String,
    gamePrice: Number,
    company: String,
    picture1: String,
    picture2: String
})

module.exports = mongoose.model('Game', game);