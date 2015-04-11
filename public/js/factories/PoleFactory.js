
app.factory('PoleFactory', function ($http) {
    return {
        localPole: [],
        getPole: function (category) {
        	var queryParams = {};
            var that = this;
        	if(category) {queryParams.category = category}
            return $http.get('/pole', {params: queryParams}).then(function (response) {
                that.localPole = response.data
                
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
