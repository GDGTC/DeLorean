'use strict';
/**
 * @ngdoc overview
 * @name devfestApp:routes
 * @description
 * # routes.js
 *
 */
angular.module('devfestApp')
  .config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .state('schedule', {
    	url: '/schedule',
        templateUrl: 'views/schedule.html',
        controller: 'ScheduleCtrl'
      })
      .state('schedule.modal', {
      	url: '/:sessionId',
      	onEnter: function($stateParams, $state, $modal) {
				// Don't allow blank session popup
				if($stateParams.sessionId === '') {
					$state.go('schedule');
					return;
				}
				$modal.open({
					templateUrl: 'views/schedule-session.html',
					controller: 'SessionModalCtrl'
				})
				.result.then(function() {
      				$state.go('schedule');
				}, function() {
					$state.go('schedule');
				});
			}
      })
      .state('schedule-edit', {
      	url: '/schedule-edit',
        templateUrl: 'views/schedule-edit.html',
        controller: 'ScheduleEditCtrl'
      })
      .state('speakers', {
      	url: '/speakers',
        templateUrl: 'views/speakers.html',
        controller: 'SpeakersCtrl'
      })
      .state('sponsorship', {
      	url: '/sponsorship',
        templateUrl: 'views/sponsorship.html',
        controller: 'SponsorshipCtrl'
      })
      .state('about', {
      	url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('login', {
      	url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('account', {
      	url: '/account',
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      });
  }]);