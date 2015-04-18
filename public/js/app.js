
var app = angular.module('pollApp',['ngAnimate','ui.router']);

app.config(function ($locationProvider, $urlRouterProvider){
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
})


app.config(function ($stateProvider) {

	$stateProvider.state('home', {
	    url: '/',
	    templateUrl: '/templates/home.html',
	    controller: function($scope, $state){

	    }
	});

    $stateProvider.state('addpoll', {
        url: '/addpoll',
        templateUrl: '/templates/addpoll.html',
        controller: function($scope, $state){

        }
    });

    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: '/templates/profile.html',
        controller: function($scope, $state){
        	
        }
    });
    $stateProvider.state('poll', {
        url: '/poll',
        templateUrl: '/templates/poll.html',
        controller: 'MainController'
        // abstract: true
        // onEnter: function($stateParams, $state) {
        // 	if($state.current.name === )
        // }
    });

    $stateProvider.state('poll.category', {
        url: '/category/:categoryName',
        templateUrl: '/templates/category.html',
        resolve: {
        	category: function($stateParams, PollFactory){
        		if($stateParams.categoryName === 'All') {
        			return PollFactory.localPoll
        		}
        		else {
                    console.log(PollFactory.localPoll)
        			return PollFactory.localPoll.filter(function(poll){
        				return poll.category === $stateParams.categoryName
        			})	
        		}
        		
        	}
        },
        controller: function($scope, $state, category){
        	$scope.poll = category;
        }
    });
});






// app.config(function ($stateProvider) {

//     $stateProvider.state('stats', {
//         url: '/stats',
//         templateUrl: 'js/templates/stats.html',
//         controller: 'StatsController'
//     });

