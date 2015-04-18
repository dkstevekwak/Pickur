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
 		}).then(function(response){
 			$scope.loggedIn = true;
 			LogFactory.loggedIn = true;
 			$scope.user = new User;
 		}).catch(function(response){
 			console.log('user not found')
 		})
 	}

 	$scope.logOut = function(user){
 		$scope.loggedIn = false;
 		LogFactory.loggedIn = false;
 		
 		return $http.get('/logout', user).then(function(response){
 			if(response.status===200){
 				$state.go('home')		
 			}
 		})
 	}
 	$scope.checkUser();


 })