 app.controller('SignInController', function($location,$scope, $state, $http, PollFactory, LogFactory){
 	var User =function() {
 		this.email= null;
 		this.password= null;
 	}
 	$scope.user = new User;
 	$scope.loggedIn = false;

 	$scope.checkUser = function(){
		return $http.get('/getuser').then(function(response){
			if(response.data._id) {
				$scope.loggedIn = true;
				LogFactory.loggedIn = true;
			}
		})
	};
 
 	$scope.sendUser = function(user){
 		return $http.post('/login', user).then(function(response){
 			if(response.status===200) {
 				$state.go('poll.category', {categoryName: 'All'})
 			}
			return response;
 		}).then(function(response){
 			$scope.loggedIn = true;
 			LogFactory.loggedIn = true;
			LogFactory.user = response.data;
 			$scope.user = new User;
 		}).catch(function(response){
 			console.log('user not found')
 		})
 	}

 	$scope.logOut = function(user){
 		$scope.loggedIn = false;
 		LogFactory.loggedIn = false;
		LogFactory.user = null;
 		
 		return $http.get('/logout', user).then(function(response){
 			if(response.status===200){
 				$state.go('home')		
 			}
 		})
 	}
 	$scope.checkUser();


 })