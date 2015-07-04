app.controller('SignUpController', function($location,$scope, $state, $http, LogFactory){
	$scope.newUser = {
		password: null,
		firstname: null,
		lastname: null,
		gender: null,
		email: null,
		bday: null
	}
	$scope.loggedIn = LogFactory.loggedIn;

	$scope.sendNewUser = function (newUser){
			return $http.post('/newUser', newUser).then(function(response){
					LogFactory.loggedIn = true;
					LogFactory.user = response.data;
					$state.go('poll.category')
					// $location.url('/categry/all')
				return response;
			}).then(function(response){
				// $scope.newCardForm.categoryField.$setPristine();		
				$scope.newUser = {
					password: null,
					firstname: null,
					lastname: null,
					gender: null,
					email: null,
					bday: null
				}

			})
		}

	$scope.genderClick = function(gender){
		$scope.newUser.gender = gender;
	
	}

	$scope.facebookLogin = function(){
		return $http.get('/auth/facebook')
	}


})






