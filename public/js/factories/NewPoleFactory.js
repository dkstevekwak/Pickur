

app.factory('NewPoleFactory', function($http){
	return{
		getNewPole: function (){
			return $http.post('/pole', {
				question: newPole.question,
				category: newPole.category,
				answers: newPole.answers
			}).then(function(response){
				return response.data;
			})
		}
	}
})