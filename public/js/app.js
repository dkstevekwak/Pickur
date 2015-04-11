
var app = angular.module('FlashCardApp',['ngAnimate','ui.router']);

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

    $stateProvider.state('addcard', {
        url: '/addcard',
        templateUrl: '/templates/addcard.html',
        controller: function($scope, $state){

        }
    });

    $stateProvider.state('scoreboard', {
        url: '/scoreboard',
        templateUrl: '/templates/stats.html',
        controller: function($scope, $state){
        	
        }
    });
    $stateProvider.state('flashcard', {
        url: '/flashcard',
        templateUrl: '/templates/flashcard.html',
        controller: 'MainController'
        // abstract: true
        // onEnter: function($stateParams, $state) {
        // 	if($state.current.name === )
        // }
    });

    $stateProvider.state('flashcard.category', {
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

