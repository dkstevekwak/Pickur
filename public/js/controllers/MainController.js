app.controller('MainController', function($sce, $scope,$state, PollFactory){
	$scope.categories = [
    'All',
    'fashion',
    'food',
    'sports',
    'entertainment'
];
	$scope.categorySelected;
	$scope.poll;
	$scope.twitter;
	$scope.isVideo = false;
	
	$scope.selectCategory = function(category){
		
		$scope.categorySelected = category;
	}
	$scope.getTwitter = function(){
		PollFactory.getTrend().then(function(receivedTrend){
			$scope.twitter=receivedTrend
		})
	}
	$scope.getCategoryCards = function(category){
		$scope.categorySelected = category;
		if(category === 'All'){ 
		$scope.poll = [];
		PollFactory.getPoll().then(function (receivedPoll){
		$scope.poll = PollFactory.localPoll;
	
	})
	}
		$scope.poll = [];
		PollFactory.getPoll(category).then(function (receivedPoll){
		$scope.poll = PollFactory.localPoll;


	})

	}

	PollFactory.getPoll().then(function (receivedPoll){
		$scope.poll = PollFactory.localPoll;
		$scope.poll.forEach(function(each){
		})
		
	}).then (function(donePoll){
		$state.go('poll.category', {categoryName: 'All'});
	})

	



	



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