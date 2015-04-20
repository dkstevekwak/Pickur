
app.factory('PollFactory', function ($http, $sce) {
    return {
        localPoll: [],
        getPoll: function (category) {
        	var queryParams = {};
            var that = this;
        	if(category) {queryParams.category = category}
            return $http.get('/poll', {params: queryParams}).then(function (response) {

                that.localPoll = response.data
                
            });
        },
        getImage: function(searchWord) {
            return $http.get('/getimage', {params:{searchWord:searchWord}}).then(function(response){
                return response.data.responseData.results;       
            });
        },
        getVideo: function(searchWord) {
            return $http.get('/getvideo', {params:{searchWord:searchWord}}).then(function(response){
                return response.data;  
            });
        },
        updatePoll: function(poll){
            return $http.put('/poll/'+poll._id, poll).then(function(response){
                console.log("here");
                console.log(response);
                console.log( response.data[0].body);
            });
            
        }
    }
});

app.factory('ScoreFactory', function(){
    
    return {
        correct: 0,
        incorrect: 0
    };


});

app.factory('LogFactory', function(){
    return {
        loggedIn: null
    }
})


