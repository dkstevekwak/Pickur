
app.factory('FlashCardsFactory', function ($http) {
    return {
        localFlashcards: [],
        getFlashCards: function (category) {
        	var queryParams = {};
            var that = this;
        	if(category) {queryParams.category = category}
            return $http.get('/cards', {params: queryParams}).then(function (response) {
                that.localFlashcards = response.data
                
            })
        }
    };
});

app.factory('ScoreFactory', function(){
    
    return {
        correct: 0,
        incorrect: 0
    };


});
