app.controller('MainController', function($scope,$state, PollFactory){
	$scope.categories = [
    'All',
    'MongoDB',
    'Express',
    'Angular',
    'Node'
];
	$scope.consoles = function(category){
		console.log(category);
	}
	$scope.categorySelected;

	$scope.getCategoryCards = function(category){
		if(category === 'All'){ 
		$scope.poll = [];
		PollFactory.getPoll().then(function (receivedPoll){
		$scope.poll = PollFactory.localPoll;
	
	})
	}
		$scope.poll = [];
		$scope.categorySelected = category;
		PollFactory.getPoll(category).then(function (receivedPoll){
		$scope.poll = PollFactory.localPoll;
	})

	}

	PollFactory.getPoll().then(function (receivedPoll){
		$scope.poll = PollFactory.localPoll;
		
	}).then (function(donePoll){
		$state.go('poll.category', {categoryName: 'All'});
	})




	



});

app.controller('StatsController', function($scope, ScoreFactory){
	$scope.scores = ScoreFactory;
});







// app.controller('FlashCardController', function($scope, ScoreFactory){
// 	$scope.answeredCorrectly = false;
// 	$scope.answered = false;
// 	$scope.alreadyAnswered = false;
		
// 		$scope.answerQuestion =function (answer){
// 			if(!$scope.answered) {
// 				$scope.answered = true;
				
// 				if(answer.correct){ 
// 					$scope.answeredCorrectly = true; 
// 					ScoreFactory.correct++;
// 				}
// 				else {
// 					$scope.answeredCorrectly = false;	
// 					ScoreFactory.incorrect++;
// 					}	
// 			} else {
				
// 				$scope.alreadyAnswered = true;		
// 			}

// 		}

// })