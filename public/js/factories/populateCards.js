app.factory('PoplulateCardsFactory', function(FlashCardsFactory){

	return function(category){
			if(category === 'Reset'){ 
			$scope.flashCards = [];
			FlashCardsFactory.getFlashCards().then(function (receivedCards){
			$scope.flashCards = receivedCards;
		
		})
		}
			$scope.flashCards = [];
			$scope.categorySelected = category;
			FlashCardsFactory.getFlashCards(category).then(function (receivedCards){
			$scope.flashCards = receivedCards;
		})

		}

	
})
