app.directive('poll', function(ScoreFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/directives/poll/poll.html',
		scope: {
			card : '='
		},
		link: function(scope, element, attrs){
			scope.answeredCorrectly;
			scope.answered;
			scope.isEditing = false;
			scope.alreadyAnswered = false;
			scope.editListner = function(){
				if(!scope.isEditing) scope.isEditing = true;
				else scope.isEditing = false;
			}
				
				scope.answerQuestion =function (answer){
					if(!scope.answered) {
						scope.answered = true;
						
						if(answer.correct){ 
							scope.answeredCorrectly = true; 
							ScoreFactory.correct++;
						}
						else {
							scope.answeredCorrectly = false;	
							ScoreFactory.incorrect++;
							}	
					} else {
						
						scope.alreadyAnswered = true;		
					}

				}
		}
	};

});