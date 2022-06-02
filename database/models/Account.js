const mongoose = require('Mongoose');

const AccountSchema = new mongoose.Schema({
    name : {type: String, required: true, max: 100},
    password : {type: String, required: true, max: 50},
    avatar : {
        Hat : {type: Schema.Types.ObjectId, ref: 'Hat'}, 
        weapon : {type: Schema.Type.ObjectId, ref: 'Weapon'}
    },
    statistics: {
        winStreak : Number,
        maxStreak : Number,
        numGames  : Number
    }
});

module.exports = mongoose.model('Account', AccountSchema);