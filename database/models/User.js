const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
    name : {type: String, required: true, max: 20},
    UID : {type: Number, required: true, unique: true},
    password : {type: String, required: true, max: 30},
    avatar : {
        hat: {type: mongoose.SchemaTypes.ObjectId, ref:'Item', default: null},
        weapon: {type: mongoose.SchemaTypes.ObjectId, ref:'Item'}
    },
    statistics: {
        win_streak: {type: Number, default: 0},
        max_streak: {type: Number, default: 0},
        num_wins  : {type: Number, default: 0},
        num_games : {type: Number, default: 0}
    },
    souls: {type: Number, default: 0},
    item_collection: {
        hats: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
        weapons: [{type: mongoose.SchemaTypes.ObjectId, ref:'Item'}]
    }
});

module.exports = mongoose.model('User', UserSchema);