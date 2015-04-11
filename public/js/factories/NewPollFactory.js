

app.factory('NewPollFactory', function($http){
	return{
		getNewPoll: function (){
			return $http.post('/poll', {
				question: newPoll.question,
				category: newPoll.category,
				answers: newPoll.answers
			}).then(function(response){
				return response.data;
			})
		}
	}
})