app.directive('poll', function($sce, ScoreFactory,PollFactory,LogFactory){
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
			scope.showResultLeft;
			scope.showResultRight;
			scope.leftClickCount = 0;
			scope.rightClickCount = 0;
			scope.isEditing = false;
			scope.isCommenting = false;
			scope.isHidden = true;
			scope.checkVideo = function(option){

				return !!option.match(/youtube/);
			}
			scope.fadeIt= function(){
				scope.isHidden = !scope.isHidden;
			}
			scope.videofy = function(url){

				return $sce.trustAsResourceUrl(url);

			}
			scope.editListner = function(){
				if(!scope.isEditing) scope.isEditing = true;
				else scope.isEditing = false;
			}	
			scope.commentListner = function(){
				if(!scope.isCommenting) scope.isCommenting = true;
				else scope.isCommenting = false;
			}	
			scope.answerQuestion =function (choice,poll){
					scope.answered = true;
					scope.showResult = true;
					if(!LogFactory.loggedIn) return alert('Please log in first!')

				if(choice==='left'){  
						scope.hideLeft = true;
						scope.showResultLeft = true;
						poll.answer = choice;
						if(!poll.answers[0].count) poll.answers[0].count=1;
						else poll.answers[0].count++;
						PollFactory.updatePoll(poll).then(function(updatedPoll){
							
						})
						

				}
				else if(choice==='right'){
						scope.hideLeft = true;
						scope.showResultRight = true;
						poll.answer = choice;
						poll.answers[1].count++;
						PollFactory.updatePoll(poll).then(function(updatedPoll){
							
						})
				}
					
			}
			
		}
	};

});