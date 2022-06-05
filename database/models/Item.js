const mongoose = require('mongoose');



const ItemSchema = new mongoose.Schema({
    item_name: {type: String, required: true, immutable: true},
    equip_slot: {type: String, enum: ['head', 'weapon'], required: true, immutable: true},
    item_type: {type: String, enum: ['shorthandle', 'longhandle', 'helmet', 'hat'], required: true},
    img_link: {type: String, required: true}, 
    cost: Number
})

module.exports = mongoose.model('Item', ItemSchema);