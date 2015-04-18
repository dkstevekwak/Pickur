

app.controller('NewPollController', function($sce, $scope, $http, PollFactory){
	$scope.categories = [
	    'All',
	    'Fashion',
	    'Food',
	    'Sports',
	    'Entertainment'
	    
	];
	$scope.newPoll = {
	    question: null,
	    category: null,
	    answers: [
	        { text: null, image: null, count:0},
	        { text: null, image: null, count:0}
	    ]
	};
	$scope.searchQuery = ''
	$scope.videoQuery=''
	$scope.searchedImages = [];
	$scope.searchedVideos = [];
	$scope.isVideo1;
	$scope.isVideo2;
	$scope.searchingImage;

	$scope.sendNewPoll = function (){
			return $http.post('/poll', {
				question: $scope.newPoll.question,
				category: $scope.newPoll.category,
				answers: $scope.newPoll.answers
			}).then(function(response){
				PollFactory.localPoll.push(response.data);
				return response.data;
			}).then(function(response){
				// $scope.newCardForm.categoryField.$setPristine();		
				$scope.newPoll.question = null;
				$scope.newPoll.category = null;
				$scope.newPoll.answers = [
		        { text: null, image: null, count:0 },
		        { text: null, image: null, count:0 }
		    	]
		    	$scope.newPollForm.$submitted= false;

			})
		}

	$scope.updatePoll = function(){
		return $http.put('/poll/' + $scope.poll._id,{
			question: $scope.newPoll.question,
			category: $scope.newPoll.category,
			answers: $scope.newPoll.answers
		})
		.then(function(response){
			PollFactory.localPoll.push(response.data);
			return response.data;
		})
		.then(function(response){
				$scope.poll.question = null;
				$scope.poll.answers = [
		        { text: null, image: null, count:0 },
		        { text: null, image: null, count:0 }
		    	]
		    	$scope.newPollForm.$submitted= false;

			})
	}
	$scope.optionClick = function(num){
		var target = $scope.poll.answers[num].correct
		target = true;
	}

	$scope.getGoogleImage = function(searchWord){
		$scope.searchingImage = true;
		PollFactory.getImage(searchWord).then(function(receivedImages){
			var array = []
			receivedImages.forEach(function(obj){
				array.push(obj.url)
			})
		 	$scope.searchedImages = array;
		})
	}
	$scope.getYoutubeVideo = function(searchWord){
		$scope.searchingImage = false;
		PollFactory.getVideo(searchWord).then(function(receivedVideos){
			var array = []
			var mapped = receivedVideos.map(function(obj){
				var stringToReturn = 'https://www.youtube.com/embed/' + obj.videoId;
				return stringToReturn
			})
			mapped.forEach(function(mappedUrl){
				array.push(mappedUrl)
			})
		 	$scope.searchedVideos = array;
		})
	}
	$scope.videofy = function(url){
		return $sce.trustAsResourceUrl(url);

	}
	$scope.getImageUrl = function(image){
		
		if(!$scope.newPoll.answers[0].image){
			$scope.isVideo1 = false;
			$scope.newPoll.answers[0].image = image;
		}
		else if(!$scope.newPoll.answers[1].image){
			$scope.isVideo2 = false;
			$scope.newPoll.answers[1].image = image;
		}
	}
	$scope.getVideoUrl = function(video){
		
		if(!$scope.newPoll.answers[0].image){
			$scope.isVideo1 = true;
			$scope.newPoll.answers[0].image = video;

		}
		else if(!$scope.newPoll.answers[1].image){
			$scope.isVideo2 = true;
			$scope.newPoll.answers[1].image = video;
		}
	}
	$scope.clear1 = function(){
		$scope.isVideo1 = false;
		$scope.newPoll.answers[0].image=null;
	}
	$scope.clear2 = function(){
		$scope.isVideo2 = false;
		$scope.newPoll.answers[1].image=null;
	}
});

