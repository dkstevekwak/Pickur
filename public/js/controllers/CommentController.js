app.controller('CommentController', function($scope, $http){
	$scope.comments = ['this is great', 'I LIKE'];
	$scope.newComment = {
		text: null
	}
//send new comment
	$scope.sendNewComment = function(){
		$scope.comments.push($scope.newComment.text);
		$scope.newComment = {text: null}
	}
//edit comment




});
