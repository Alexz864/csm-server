const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema ({
    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    image:{
        data:Buffer,
        contentType: String
    }
});

const Player = mongoose.model('player', PlayerSchema);

module.exports = Player;