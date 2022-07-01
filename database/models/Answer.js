const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
	answer : {type: String, required: true, max: 5},
    from : {type: String, max: 20},
	date : {type: String, required: true},
	hour : {type: Number, required: true}
});

module.exports = mongoose.model('Answer', AnswerSchema);