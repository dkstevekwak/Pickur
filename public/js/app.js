
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

    $stateProvider.state('addpole', {
        url: '/addpole',
        templateUrl: '/templates/addpole.html',
        controller: function($scope, $state){

        }
    });

    $stateProvider.state('scoreboard', {
        url: '/scoreboard',
        templateUrl: '/templates/stats.html',
        controller: function($scope, $state){
        	
        }
    });
    $stateProvider.state('pole', {
        url: '/pole',
        templateUrl: '/templates/pole.html',
        controller: 'MainController'
        // abstract: true
        // onEnter: function($stateParams, $state) {
        // 	if($state.current.name === )
        // }
    });

    $stateProvider.state('pole.category', {
        url: '/category/:categoryName',
        templateUrl: '/templates/category.html',
        resolve: {
        	category: function($stateParams, FlashCardsFactory){
        		if($stateParams.categoryName === 'All') {
        			return FlashCardsFactory.localFlashcards
        		}
        		else {
        			return FlashCardsFactory.localFlashcards.filter(function(flashcard){
        				return flashcard.category === $stateParams.categoryName
        			})	
        		}
        		
        	}
        },
        controller: function($scope, $state, category){
        	$scope.flashCards = category;
        }
    });
});






// app.config(function ($stateProvider) {

//     $stateProvider.state('stats', {
//         url: '/stats',
//         templateUrl: 'js/templates/stats.html',
//         controller: 'StatsController'
//     });

