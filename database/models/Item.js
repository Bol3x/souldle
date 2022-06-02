const mongoose = require('Mongoose');

const ItemSchema = new mongoose.Schema({
    image_name: {type: String, required: true},
    item_type: {type: String, enum: ['Hat', 'Weapon'], required: true},
    cost: Number
})

module.exports = mongoose.model('item', ItemSchema);