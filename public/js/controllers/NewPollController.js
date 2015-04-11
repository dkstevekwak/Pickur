

app.controller('NewPollController', function($scope, $http, PollFactory){
	$scope.categories = [
	    'All',
	    'MongoDB',
	    'Express',
	    'Angular',
	    'Node'
	    
	];
	$scope.poll = {
	    question: null,
	    category: null,
	    answers: [
	        { text: null, correct: false },
	        { text: null, correct: false },
	        { text: null, correct: false }
	    ]
	};

	$scope.sendNewPoll = function (){
			return $http.post('/poll', {
				question: $scope.poll.question,
				category: $scope.poll.category,
				answers: $scope.poll.answers
			}).then(function(response){
				PollFactory.localPoll.push(response.data);
				return response.data;
			}).then(function(response){
				// $scope.newCardForm.categoryField.$setPristine();		
				$scope.poll.question = null;
				$scope.poll.category = null;
				$scope.poll.answers = [
		        { text: null, correct: false },
		        { text: null, correct: false },
		        { text: null, correct: false }
		    	]
		    	$scope.newPollForm.$submitted= false;

			})
		}

	$scope.updatePoll = function(){
		var card = $scope.card;
		return $http.put('/poll/' + $scope.card._id,{
			question: $scope.poll.question,
			category: $scope.poll.category,
			answers: $scope.poll.answers
		})
		.then(function(response){
			PollFactory.localPoll.push(response.data);
			return response.data;
		})
		.then(function(response){
				$scope.poll.question = null;
				$scope.poll.category = null;
				$scope.poll.answers = [
		        { text: null, correct: false },
		        { text: null, correct: false },
		        { text: null, correct: false }
		    	]
		    	$scope.newPollForm.$submitted= false;

			})
	}
	$scope.optionClick = function(num){
		var target = $scope.poll.answers[num].correct
		target = true;
	}

});

