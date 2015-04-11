var mongoose = require('mongoose');

var schema = new mongoose.Schema({
   question: String,
   category: String,
   answers: [
       { text: String, correct: Boolean, image: String, count: Number }
   ],
   responses: [Number]
});

module.exports = mongoose.model('Poll', schema);