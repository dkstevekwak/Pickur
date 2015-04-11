
app.factory('PollFactory', function ($http) {
    return {
        localPoll: [],
        getPoll: function (category) {
        	var queryParams = {};
            var that = this;
        	if(category) {queryParams.category = category}
            return $http.get('/poll', {params: queryParams}).then(function (response) {
                that.localPoll = response.data
                
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
