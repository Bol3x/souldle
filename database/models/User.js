const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvatarSchema = new Schema({
    hat: {type: mongoose.SchemaTypes.ObjectId, ref:'Item'},
    weapon: {type: mongoose.SchemaTypes.ObjectId, ref:'Item'}
})

const statisticSchema = new Schema({
    winstreak: Number,
    maxStreak: Number,
    numGames : Number
})

const UserSchema = new Schema({
    name : {type: String, required: true, max: 100},
    password : {type: String, required: true, max: 50},
    avatar : AvatarSchema,
    statistics: statisticSchema,
    souls: {type: Number, default: 0},
});

module.exports = mongoose.model('User', UserSchema);