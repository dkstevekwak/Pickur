app.directive('poll', function(ScoreFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/directives/poll/poll.html',
		scope: {
			poll : '='
		},
		link: function(scope, element, attrs){
			scope.answered;
			scope.showResult;
			scope.hideLeft;
			scope.hideRight;
			scope.leftClickCount = 0;
			scope.rightClickCount = 0;
			scope.isEditing = false;
			scope.editListner = function(){
				if(!scope.isEditing) scope.isEditing = true;
				else scope.isEditing = false;
			}	
			scope.answerQuestion =function (choice){
					scope.answered = true;
					scope.showResult = true;
					

				if(choice==='left'){  
						scope.hideRight = true;
						scope.leftClickCount++;

				}
				else if(choice==='right'){
						scope.hideLeft = true;
						scope.rightClickCount++
				}
					
						

				}
		}
	};

});