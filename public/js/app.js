
var app = angular.module('pollApp',['ngAnimate','ui.router']);

app.config(function ($locationProvider, $urlRouterProvider){
	$locationProvider.html5Mode(true);
	// $urlRouterProvider.otherwise('/');
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

    $stateProvider.state('scoreboard', {
        url: '/scoreboard',
        templateUrl: '/templates/stats.html',
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
        	category: function($stateParams, NewPollFactory){
        		if($stateParams.categoryName === 'All') {
        			return NewPollFactory.localPoll
        		}
        		else {
        			return NewPollFactory.localPoll.filter(function(pole){
        				return pole.category === $stateParams.categoryName
        			})	
        		}
        		
        	}
        },
        controller: function($scope, $state, category){
        	$scope.polls = category;
        }
    });
});






// app.config(function ($stateProvider) {

//     $stateProvider.state('stats', {
//         url: '/stats',
//         templateUrl: 'js/templates/stats.html',
//         controller: 'StatsController'
//     });

