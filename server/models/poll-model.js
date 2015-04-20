var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
   question: String,
   category: String,
   answers: [
       { text: String, correct: Boolean, image: String, count: Number }
   ],
   responses: [String]
});

pollSchema.virtual('results').get(function(){
	var leftCount = this.responses.filter(function(cell){
		return cell == 'left';
	}).length;
	var rightCount = this.responses.filter(function(cell){
		return cell == 'right';
	}).length;
	var responseCount = this.responses.length;

	var data = {
		'left' : leftCount,
		'right' : rightCount,
		'total': responseCount
	};
	return data;
});

var userSchema = new mongoose.Schema({
	password: {type: String, required: true},
	firstname: String,
	lastname: String,
	gender: String,
	email: {type: String, required: true},
	bday: String,
	facebook: {
		id: String,
		token: String,
		firstname: String,
		lastname: String,
		gender: String,
		email: String
	}
})

var Poll = mongoose.model('Poll', pollSchema);
var User = mongoose.model('User', userSchema);
module.exports = {Poll:Poll, User:User};