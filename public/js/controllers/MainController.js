app.controller('MainController', function($scope,$state, FlashCardsFactory){
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
		$scope.flashCards = [];
		FlashCardsFactory.getFlashCards().then(function (receivedCards){
		$scope.flashCards = FlashCardsFactory.localFlashcards;
	
	})
	}
		$scope.flashCards = [];
		$scope.categorySelected = category;
		FlashCardsFactory.getFlashCards(category).then(function (receivedCards){
		$scope.flashCards = FlashCardsFactory.localFlashcards;
	})

	}

	FlashCardsFactory.getFlashCards().then(function (receivedCards){
		$scope.flashCards = FlashCardsFactory.localFlashcards;
		
	}).then (function(doneCards){
		$state.go('flashcard.category', {categoryName: 'All'});
	})


	// $scope.switchToCategoryPage = function(category){
	// 	console.log(category)
	// 	$state.go('flashcard.category', {categoryName: category});
	// };
	        



	



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