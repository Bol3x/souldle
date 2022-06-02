const mongoose = require('Mongoose');

const HatSchema = new mongoose.Schema({
    image_name: {type: String, required: true},
    cost: Number
})

module.exports = mongoose.model('Hat', HatSchema);