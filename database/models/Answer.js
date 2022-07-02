const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
	answer : {type: String, required: true, max: 5},
    from : {type: String, max: 20},
	hour : {type: Number, min:0, max:23, required: true}
});

module.exports = mongoose.model('Answer', AnswerSchema);
