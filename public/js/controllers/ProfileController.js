 app.controller('ProfileController', function($location,$scope, $state, $http, PollFactory){
 	$scope.loggedInUser = null;
 	
 	$scope.getUser= function (){
 		return $http.get('/getuser').then(function(response){
 			$scope.loggedInUser=response.data;
 		})
 	}
 	$scope.getUser()
 });