

app.factory('NewCardFactory', function($http){
	return{
		getNewCard: function (){
			return $http.post('/cards', {
				question: newCard.question,
				category: newCard.category,
				answers: newCard.answers
			}).then(function(response){
				return response.data;
			})
		}
	}
})