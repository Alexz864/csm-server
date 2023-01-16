const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    team1: String,
    team2: String,
    data: String,
    scor: String,
})

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;